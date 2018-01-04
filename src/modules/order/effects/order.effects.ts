import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { OrderProvider } from "../providers/order.provider";

import * as orderActions from '../actions/order.actions';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

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


  constructor(
    private actions: Actions,
    private orderProvider: OrderProvider,
    private toastCtrl: ToastController
  ) { }

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