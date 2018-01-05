import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Loading, App } from "ionic-angular";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { OrderProvider } from "../providers/order.provider";
import { TableProvider } from "../../table/providers/table.provider";
import { AuthProvider } from "../../auth/providers/auth.provider";

import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

import * as orderActions from '../actions/order.actions';
import * as fromAuth from '../../auth/reducers/auth.reducer';

@Injectable()
export class OrderEffects {

  @Effect()
  getOrders$: Observable<Action> = this.actions
    .ofType(orderActions.GET_ORDERS)
    .map(toPayload)
    .switchMap((payload?: { filter: IFilter }) => this.orderProvider.getOrders(payload ? payload.filter : null))
    .map((orders: IOrder[]) => new orderActions.GetOrdersSuccess({ orders }))
    .catch(err => Observable.of(new orderActions.GetOrdersFailed({ err })));

  @Effect()
  getOrdersFailed$: Observable<Action> = this.actions
    .ofType(orderActions.GET_ORDERS_FAILED)
    .map(toPayload)
    .do((payload: { err: any }) => this.presentToast(payload.err || 'Server error'))
    .switchMap((payload: { err: any }) => []);

  @Effect()
  CreateOrder$: Observable<Action> = this.actions
    .ofType(orderActions.CREATE_ORDER)
    .map(toPayload)
    .do((order: IOrder) => this.loader.setContent('Creando orden').present())
    .switchMap((order: IOrder) => this.store.select(fromAuth.getUser).map(user => Object.assign({}, order, { user: this.authProvider.getUserRef(user.uid) })))
    .map((order: IOrder) => Object.assign({}, order, { table: this.tableProvider.getTableRef(order.table) }))
    .switchMap((order: IOrder) => this.orderProvider.createOrder(order))
    .switchMap((order) => this.tableProvider.addOrder(order.table, this.orderProvider.getOrderRef(order.id)))
    .map(res => new orderActions.CreateOrderSuccess())
    .do(() => this.loader.dismiss())
    .do(() => this.appCtrl.getActiveNav().pop())
    .catch(err => Observable.of(new orderActions.CreateOrderFailed({ err })));
  
  loader: Loading;

  constructor(
    private actions: Actions,
    private appCtrl: App,
    private orderProvider: OrderProvider,
    private tableProvider: TableProvider,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private store: Store<any>
  ) { 
    this.loader = this.loadingCtrl.create();
  }

  presentToast(message: string, duration: number = 4000, position: string = 'bottom', showCloseButton: boolean = true) {
    this.toastCtrl.create({
      duration,
      message,
      position,
      closeButtonText: 'Ok',
      showCloseButton
    }).present();
  }

}