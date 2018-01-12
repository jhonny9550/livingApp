import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Loading, ModalController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import { TableProvider } from "../providers/table.provider";

import { IFilter } from "../../shared/models/filter.model";
import { ITable } from "../models/table.model";
import { IOrder } from '../../order/models/order.model';

import * as tableActions from '../actions/table.actions';
import { OrderProvider } from "../../order/providers/order.provider";
import { ChargePage } from "../pages/charge/charge.page";

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
    .switchMap((payload: { table: ITable, service: boolean }) => Promise.all(payload.table.orders.map(orderRef => orderRef.get().then(snap => snap.data()))).then(res => res.filter((order: IOrder) => order.status === 'delivered').reduce((total, next) => (total + next.total_amount), 0)).then(res => this.presentChargeModal(payload.service, res, payload.table.id)))
    .do(() => this.loader.dismiss())
    .switchMap(() => []);
  
  @Effect()
  updateTable$: Observable<Action> = this.actions
    .ofType(tableActions.UPDATE_TABLE)
    .map(toPayload)
    .do((payload) => this.presentLoader('Procesando'))
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
    private modalCtrl: ModalController
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

}
