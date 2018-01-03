import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import * as tableActions from '../actions/table.actions';
import { IFilter } from "../../shared/models/filter.model";
import { TableProvider } from "../providers/table.provider";

@Injectable()
export class TableEffects {

  @Effect()
  getTables$: Observable<Action> = this.actions
    .ofType(tableActions.GET_TABLES)
    .map(toPayload)
    .switchMap((payload?: { filter: IFilter }) => this.tableProvider.getTables(payload ? payload.filter : null))
    .do(tables => console.log('Tables: ', tables))
    .map(tables => new tableActions.GetTablesSuccess({ tables }))
    .catch(err => Observable.of(new tableActions.GetTablesFailed({ err })));

  @Effect()
  getTablesSuccess$: Observable<Action> = this.actions
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
