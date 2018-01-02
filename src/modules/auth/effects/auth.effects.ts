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
import { ToastController } from "ionic-angular";

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
          return new userActions.Authenticated({...res});
        })
        .catch(error => {
          const msg = this.auth.parseErrorCode(error);
          console.log('Error: ', msg);
          return new userActions.AuthError({ error, msg });
        });
    });

  @Effect()
  authError$: Observable<Action> = this.actions
    .ofType(userActions.AUTH_ERROR)
    .map(toPayload)
    .switchMap((payload: { error?: any, msg: string }) => {
      this.toastCtrl.create({
        message: payload.msg,
        duration: 4000,
        position: 'bottom',
        closeButtonText: 'Ok',
        showCloseButton: true
      }).present();
      return [];
    })

  constructor(
    public actions: Actions,
    public auth: AuthProvider,
    public toastCtrl: ToastController
  ) { }
}