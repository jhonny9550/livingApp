import { Injectable } from "@angular/core";
import { ToastController, App } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { AuthProvider } from "../providers/auth.provider";
import { IUser } from "../models/user.model";

import * as userActions from '../actions/auth.actions';

import { LoginPage } from "../pages/login/login.page";
import { WaiterTabsPage } from "../../waiter/pages/waiter-tabs/waiter-tabs.page";

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions
    .ofType(userActions.LOGIN)
    .map(toPayload)
    .switchMap((payload: { email: string, password: string }) => {
      return this.auth.login(payload.email, payload.password)
        .then(res => new userActions.GetUserData({ uid: res.uid }))
        .catch(error => {
          console.log('Error: ', error);
          const msg = this.auth.parseErrorCode(error);
          return new userActions.AuthError({ error, msg })
        });
    });
  
  @Effect()
  logout$: Observable<Action> = this.actions
    .ofType(userActions.LOGOUT)
    .do(() => this.auth.logout())
    .map(() => new userActions.NotAuthenticated());

  @Effect()
  VerifyUser$: Observable<Action> = this.actions
    .ofType(userActions.VERIFY_USER)
    .startWith(new userActions.VerifyUser())
    .switchMap(() => this.auth.user$)
    .take(1)
    .do(user => console.log('Local user data: ', user))
    .map(user => user ? new userActions.GetUserData({ uid: user.uid }) : new userActions.NotAuthenticated());

  @Effect()
  getUserData$: Observable<Action> = this.actions
    .ofType(userActions.GET_USER_DATA)
    .map(toPayload)
    .switchMap((payload: { uid: string }) => this.auth.fetchUserData(payload.uid))
    .map((user: IUser) => new userActions.GetUserDataSuccess({ ...user }))
    .catch(error => Observable.of(new userActions.GetUserDataFailed({ error })));

  @Effect()
  getUserDataSuccess$: Observable<Action> = this.actions
    .ofType(userActions.GET_USER_DATA_SUCCESS)
    .map(toPayload)
    .do((payload: IUser) => this.presentToast('Bienvenido ' + payload.displayName, 2000, 'top'))
    .map((payload: IUser) => new userActions.Authenticated({ ...payload }));

  @Effect()
  getUserDataFailed$: Observable<Action> = this.actions
    .ofType(userActions.GET_USER_DATA_FAILED)
    .map(toPayload)
    .do((payload: { error: any }) => this.auth.logout())
    .map((payload: { error: any }) => new userActions.AuthError({ msg: payload.error || 'Server error' }));

  @Effect()
  authenticated$: Observable<Action> = this.actions
    .ofType(userActions.AUTHENTICATED)
    .map(toPayload)
    .do((payload: IUser) => {
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
          this.appCtrl.getRootNav().setRoot(WaiterTabsPage);
        };
        default: {
          console.log('User role: ', payload.role);
        }
      }
    }).switchMap(() => []);

  @Effect()
  notAuthenticated$: Observable<Action> = this.actions
    .ofType(userActions.NOT_AUTHENTICATED)
    .do(() => this.appCtrl.getRootNav().setRoot(LoginPage))
    .switchMap(() => []);

  @Effect()
  authError$: Observable<Action> = this.actions
    .ofType(userActions.AUTH_ERROR)
    .map(toPayload)
    .do((payload: { error?: any, msg: string }) => this.presentToast(payload.msg))
    .map((payload: { error?: any, msg: string }) => new userActions.NotAuthenticated());

  constructor(
    private actions: Actions,
    private auth: AuthProvider,
    private toastCtrl: ToastController,
    private appCtrl: App
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