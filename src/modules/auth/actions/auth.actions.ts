import { Action } from '@ngrx/store';

export const LOGIN = '[auth] login';
export const LOGOUT = '[auth] logout';

export const AUTHENTICATED = '[auth] authenticated';
export const NOT_AUTHENTICATED = '[auth] not authenticated';

export const AUTH_ERROR = '[auth] auth error';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { email: string, password: string }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload: { uid: string, displayName: string, email: string }) { }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor() { }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload: { error?: any, msg: string }) { }
}

export type All
  = Login
  | Logout
  | Authenticated
  | NotAuthenticated
  | AuthError;