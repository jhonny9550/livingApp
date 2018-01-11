import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import { TableProvider } from "../providers/table.provider";

import { IFilter } from "../../shared/models/filter.model";
import { ITable } from "../models/table.model";

import * as tableActions from '../actions/table.actions';

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

  constructor(
    private actions: Actions,
    private tableProvider: TableProvider,
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
