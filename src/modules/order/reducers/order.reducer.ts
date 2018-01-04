import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IOrderList, IOrderModule } from "../models/order.model";

import * as orderActions from '../actions/order.actions';

export type Action = orderActions.All;

export const initialState: IOrderList = { orders: [] };

export function reducer(state: IOrderList = initialState, action: Action) {
  switch (action.type) {
    case orderActions.GET_ORDERS: {
      return { ...state, loading: true };
    };
    case orderActions.GET_ORDERS_SUCCESS: {
      return { ...state, ...action.payload, loading: false };
    };
    case orderActions.GET_ORDERS_FAILED: {
      return initialState;
    }; 
    default:
      return state;
  }
};

export const getOrderModule = createFeatureSelector<IOrderModule>('orderModule');
export const getOrderList = createSelector(getOrderModule, (state: IOrderModule) => state.orderList);
export const getOrder = id => createSelector(getOrderList, (state: IOrderList) => state.orders.find(el => el.id === id));
