import { Injectable } from "@angular/core";
import { ToastController, Loading, LoadingController, App } from "ionic-angular";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import { BillProvider } from "../providers/bill.provider";

import { IBill } from "../models/bill.model";
import { IFilter } from "../../shared/models/filter.model";

import * as billActions from '../actions/bill.actions';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import * as fromTable from '../../table/reducers/table.reducer';
import { AuthProvider } from "../../auth/providers/auth.provider";
import { TableProvider } from "../../table/providers/table.provider";
import { OrderProvider } from "../../order/providers/order.provider";
import { DEFAULT_ORDER_VALUES } from "../../order/models/order.model";

@Injectable()
export class BillEffects {

  @Effect()
  getBills$: Observable<Action> = this.actions
    .ofType(billActions.GET_BILLS)
    .map(toPayload)
    .switchMap((payload?: IFilter) => this.billProvider.getBills(payload ? payload : null))
    .map((bills: IBill[]) => new billActions.GetBillsSuccess(bills))
    .catch(err => Observable.of(new billActions.GetBillsFailed({ err })));
  
  @Effect()
  changeStatus$: Observable<Action> = this.actions
    .ofType(billActions.CHANGE_STATUS)
    .map(toPayload)
    .do(() => this.presentLoader('Cambiando estado'))
    .switchMap((payload: { bill: any, status: string, removeView: boolean, loaderMsg: string }) => payload.bill.update({ status }).then(() => payload.removeView ? this.appCtrl.getActiveNav().pop() : null))
    .do(() => this.loader.dismiss())
    .map(() => new billActions.ChangeStatusSuccess())
    .catch(err => Observable.of(new billActions.ChangeStatusFailed({ err })));
  
  @Effect()
  createBill$: Observable<Action> = this.actions
    .ofType(billActions.CREATE_BILL)
    .map(toPayload)
    .do(() => this.presentLoader('Creando cuenta de cobro'))
    .switchMap((bill: IBill) => {
      return Promise.all(bill.orders.map(orderRef => this.orderProvider.getOrderRef(orderRef.id).get().then(snap => snap.data())))
        .then(orders => orders.filter(order => order.status === DEFAULT_ORDER_VALUES.STATUS.DELIVERED).map(order => this.orderProvider.getOrderRef(order.id)))
        .then(deliveredOrders => Object.assign({}, bill, { orders: deliveredOrders }));
    })
    .switchMap((bill: IBill) => this.store.select(fromAuth.getUser).map(user => Object.assign({}, bill, { user: this.authProvider.getUserRef(user.uid) })))
    .map((bill: IBill) => Object.assign({}, bill, { table: this.tableProvider.getTableRef(bill.table) }))
    .switchMap((bill: IBill) => this.billProvider.createBill(bill))
    .map(() => new billActions.CreateBillSuccess())
    .do(() => this.loader.dismiss())
    .catch(err => Observable.of(new billActions.CreateBillFailed({ err })));
  
  loader: Loading;

  constructor(
    private actions: Actions,
    private billProvider: BillProvider,
    private authProvider: AuthProvider,
    private tableProvider: TableProvider,
    private orderProvider: OrderProvider,
    private loadingCtrl: LoadingController,
    private appCtrl: App,
    private store: Store<any>
  ) { }

  presentLoader(content: string) {
    this.loader = this.loadingCtrl.create({ content });
    this.loader.present();
  }

}