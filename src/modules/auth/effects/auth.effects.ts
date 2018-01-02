import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/take';
import "rxjs/add/observable/of";
import "rxjs/add/observable/empty";

import * as userActions from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';
import { AuthProvider } from "../providers/auth.provider";
import { ToastController, App } from "ionic-angular";
import { IUser } from "../models/user.model";

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions
    .ofType(userActions.LOGIN)
    .map(toPayload)
    .switchMap((payload: { email: string, password: string }) => {
      console.log('Effect flag, payload: ', payload);
      return this.auth.login(payload.email, payload.password)
        .then(res => {
          console.log('Response: ', res);
          return new userActions.GetUserData({ uid: res.uid });
        })
        .catch(error => {
          const msg = this.auth.parseErrorCode(error);
          console.log('Error: ', msg);
          return new userActions.AuthError({ error, msg });
        });
    });

  @Effect()
  getUserData$: Observable<Action> = this.actions
    .ofType(userActions.GET_USER_DATA)
    .map(toPayload)
    .switchMap((payload: { uid: string }) => {
      return this.auth.fetchUserData(payload.uid)
        .then(user => new userActions.GetUserDataSuccess({ ...user }))
        .catch(error => new userActions.GetUserDataFailed({ error }));
    });
  
  @Effect()
  getUserDataSuccess$: Observable<Action> = this.actions
    .ofType(userActions.GET_USER_DATA_SUCCESS)
    .map(toPayload)
    .map((payload: IUser) => {
      switch (payload.role) {
        case 'barman': {
          // this.appCtrl.getActiveNav().setRoot('');
          console.log('Nav to barman page');
        };
        case 'cashier': {
          // this.appCtrl.getActiveNav().setRoot('');
          console.log('Nav to cashier page');
        };
        case 'waiter': {
          this.appCtrl.getActiveNav().setRoot('WaiterTabsPage');
        };
        default: {
          this.toastCtrl.create({
            duration: 4000,
            message: 'Bienvenido ' + payload.displayName,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: true
          }).present();
          return new userActions.Authenticated({ ...payload });
        }  
      }
    });
  
  @Effect()
  getUserDataFailed: Observable<Action> = this.actions
    .ofType(userActions.GEST_USER_DATA_FAILED)
    .map(toPayload)
    .map((payload: { error: any }) => {
      console.log('Fetch data error: ', payload.error);
      this.auth.logout();
      const msg = payload.error || 'Server error';
      return new userActions.AuthError({ msg });
    });

  @Effect()
  authError$: Observable<Action> = this.actions
    .ofType(userActions.AUTH_ERROR)
    .map(toPayload)
    .map((payload: { error?: any, msg: string }) => {
      this.toastCtrl.create({
        message: payload.msg,
        duration: 4000,
        position: 'bottom',
        closeButtonText: 'Ok',
        showCloseButton: true
      }).present();
      return new userActions.NotAuthenticated();
    })

  constructor(
    private actions: Actions,
    private auth: AuthProvider,
    private toastCtrl: ToastController,
    private appCtrl: App
  ) { }
}