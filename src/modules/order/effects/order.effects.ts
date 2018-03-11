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
import { IUser } from "../../auth/models/user.model";

import * as orderActions from '../actions/order.actions';
import * as fromAuth from '../../auth/reducers/auth.reducer';

@Injectable()
export class OrderEffects {

  @Effect()
  getOrders$: Observable<Action> = this.actions
    .ofType(orderActions.GET_ORDERS)
    .map(toPayload)
    .switchMap((payload?: { filter: IFilter }) =>
      this.orderProvider.getOrders(payload ? payload.filter : null)
        .map((orders: IOrder[]) => new orderActions.GetOrdersSuccess({ orders }))
        .catch(err => Observable.of(new orderActions.GetOrdersFailed({ err })))
    );

  @Effect({ dispatch: false })
  getOrdersFailed$ = this.actions
    .ofType(orderActions.GET_ORDERS_FAILED)
    .map(toPayload)
    .do((payload: { err: any }) => this.presentToast(payload.err || 'Server error'));

  @Effect()
  CreateOrder$: Observable<Action> = this.actions
    .ofType(orderActions.CREATE_ORDER)
    .map(toPayload)
    .do((order: IOrder) => this.presentLoader('Creando orden'))
    .withLatestFrom(this.store.select(fromAuth.getUser))
    .map(([order, user]: [IOrder, IUser]) => Object.assign({}, order, { user: this.authProvider.getUserRef(user.uid), table: this.tableProvider.getTableRef(order.table) }))
    .switchMap((order: IOrder) =>
      Observable.fromPromise(this.orderProvider.createOrder(order))
        .switchMap((order) =>
          Observable.fromPromise(this.tableProvider.addOrder(order.table, this.orderProvider.getOrderRef(order.id)))
            .map(res => new orderActions.CreateOrderSuccess())
            .do(() => this.loader.dismiss())
            .do(() => this.appCtrl.getActiveNav().pop())
            .catch(err => Observable.of(new orderActions.CreateOrderFailed({ err })))
        )
        .catch(err => Observable.of(new orderActions.CreateOrderFailed({ err })))
    )
    .catch(err => Observable.of(new orderActions.CreateOrderFailed({ err })));

  @Effect()
  changeOrderStatus$: Observable<Action> = this.actions
    .ofType(orderActions.CHANGE_ORDER_STATUS)
    .map(toPayload)
    .do((payload: { order: any, status: string, removeView: boolean, loaderMsg: string }) => this.presentLoader(payload.loaderMsg))
    .switchMap((payload: { order: any, status: string, removeView: boolean, loaderMsg: string }) =>
      Observable.fromPromise(this.orderProvider.changeOrderStatus(payload.order, payload.status).then(() => payload.removeView ? this.appCtrl.getActiveNav().pop() : null))
        .do(() => this.loader.dismiss())
        .map(() => new orderActions.ChangeOrderStatusSuccess())
        .catch(err => Observable.of(new orderActions.ChangeOrderStatusFailed({ err })))
    )
    .catch(err => Observable.of(new orderActions.ChangeOrderStatusFailed({ err })));

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
  ) {}

  presentLoader(content: string) {
    this.loader = this.loadingCtrl.create({ content });
    this.loader.present();
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