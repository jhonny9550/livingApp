import * as authActions from '../actions/auth.actions';
import { IUser, User, IUserModule } from "../models/user.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export type Action = authActions.All;

export const initialState: IUser = new User(null, null, 'GUEST', false);

export function reducer(state: IUser = initialState, action: Action) {
  switch (action.type) {
    case authActions.LOGIN: {
      return { ...state, loading: true };
    }
    case authActions.LOGOUT: {
      return initialState;
    }
    case authActions.AUTHENTICATED: {
      return { ...state, ...action.payload, loading: false };
    }
    case authActions.NOT_AUTHENTICATED: {
      return { ...state, ...initialState, loading: false };
    }  
    case authActions.AUTH_ERROR: {
      return { ...state, error: action.payload.error, loading: false };
    }  
    default:
      return state;
  }
}

export const getUserModule = createFeatureSelector<IUserModule>('userModule');
export const getUser = createSelector(getUserModule, (state: IUserModule) => state.user);