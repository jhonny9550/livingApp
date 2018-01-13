import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Loading, ModalController, AlertController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import { TableProvider } from "../providers/table.provider";

import { IFilter } from "../../shared/models/filter.model";
import { ITable } from "../models/table.model";
import { IOrder, DEFAULT_ORDER_VALUES } from '../../order/models/order.model';

import { ChargePage } from "../pages/charge/charge.page";

import * as tableActions from '../actions/table.actions';
import { OrderProvider } from "../../order/providers/order.provider";

@Injectable()
export class TableEffects {

  @Effect()
  getTables$: Observable<Action> = this.actions
    .ofType(tableActions.GET_TABLES)
    .map(toPayload)
    .switchMap((payload?: { filter: IFilter }) => this.tableProvider.getTables(payload ? payload.filter : null))
    .map((tables: ITable[]) => new tableActions.GetTablesSuccess({ tables }))
    .catch(err => Observable.of(new tableActions.GetTablesFailed({ err })));

  @Effect()
  getTablesFailed$: Observable<Action> = this.actions
    .ofType(tableActions.GET_TABLES_FAILED)
    .map(toPayload)
    .do((payload: { err: any }) => this.presentToast(payload.err || 'Server error'))
    .switchMap((payload: { err: any }) => []);

  @Effect()
  charge$: Observable<Action> = this.actions
    .ofType(tableActions.CHARGE)
    .map(toPayload)
    .do(payload => this.presentLoader('Generando cobro'))
    .switchMap((payload: { table: ITable, service: boolean }) => Promise.all(payload.table.orders.map(orderRef => orderRef.get().then(snap => snap.data())))
      .then(res => {
        let total = res.filter((order: IOrder) => order.status === DEFAULT_ORDER_VALUES.STATUS.DELIVERED).reduce((total, next) => (total + next.total_amount), 0);
        if (total === 0) {
          return this.presentAlert('No se puede realizar el cobro porque ninguna orden ha sido entregada', 'Alerta');
        }
        if (res.filter((order: IOrder) => (order.status !== DEFAULT_ORDER_VALUES.STATUS.CANCELED || DEFAULT_ORDER_VALUES.STATUS.DELIVERED)).length > 0) {
          this.presentAlert('Se cancelarán las ordenes que no se han entregado para realizar el cobro', 'Importante', null, () => {
            return Promise.all(res.filter((order: IOrder) => order.status !== DEFAULT_ORDER_VALUES.STATUS.DELIVERED).map((order: IOrder) => this.orderProvider.getOrderRef(order.id).update({ status: DEFAULT_ORDER_VALUES.STATUS.CANCELED })))
              .then(() => this.presentChargeModal(payload.service, total, payload.table.id))
          }, null);
        } else {
          this.presentChargeModal(payload.service, total, payload.table.id);
        }
      })
      .catch(err => console.log('Error: ', err)))
    .do(() => this.loader.dismiss())
    .switchMap(() => [])
    .catch(err => Observable.of('Obs err'));

  @Effect()
  updateTable$: Observable<Action> = this.actions
    .ofType(tableActions.UPDATE_TABLE)
    .map(toPayload)
    .do((payload) => this.presentLoader('Actualizando mesa'))
    .switchMap((payload: { tableId: string, data: any }) => this.tableProvider.updateTable(payload.tableId, payload.data))
    .do(() => this.loader.dismiss())
    .switchMap(() => []);

  loader: Loading;

  constructor(
    private actions: Actions,
    private tableProvider: TableProvider,
    private orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

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
  };

  presentChargeModal(service: boolean, total: number, tableId: string) {
    const chargeDetail = {
      service: service ? total * 0.1 : 0,
      subtotal: total,
      total: total + (total * (service ? 0.1 : 0)),
      tableId
    };
    this.modalCtrl.create(ChargePage, chargeDetail).present().then(() => console.log('Modal opened'));
  }

  presentAlert(message: string, title: string, subTitle?: string, aceptFn?: any, cancelFn?: any) {
    this.alertCtrl.create({
      title,
      message,
      subTitle,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelFn
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: aceptFn
        }
      ]
    }).present();
  }

}
