import { Action } from '@ngrx/store';
import { IUser } from "../models/user.model";

export const LOGIN = '[auth] login';
export const LOGOUT = '[auth] logout';

export const GET_USER_DATA = '[auth] get user data';
export const GET_USER_DATA_SUCCESS = '[auth] get user data success';
export const GEST_USER_DATA_FAILED = '[auth] get user data failed';

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

export class GetUserData implements Action {
  readonly type = GET_USER_DATA;
  constructor(public payload: { uid: string }) { }
}

export class GetUserDataSuccess implements Action {
  readonly type = GET_USER_DATA_SUCCESS;
  constructor(public payload: { role: string }) { }
}

export class GetUserDataFailed implements Action {
  readonly type = GEST_USER_DATA_FAILED;
  constructor(public payload: { error?: any }) { }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload: IUser) { }
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
  | GetUserData
  | GetUserDataSuccess
  | GetUserDataFailed
  | Authenticated
  | NotAuthenticated
  | AuthError;