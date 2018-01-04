import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

export const GET_ORDERS = '[order] get orders';
export const GET_ORDERS_SUCCESS = '[order] get orders success';
export const GET_ORDERS_FAILED = '[order] get orders failed';

export class GetOrders implements Action {
  readonly type = GET_ORDERS;
  constructor(public payload?: { filter: IFilter }) { }
};

export class GetOrdersSuccess implements Action {
  readonly type = GET_ORDERS_SUCCESS;
  constructor(public payload: { orders: IOrder[] }) { }
};

export class GetOrdersFailed implements Action {
  readonly type = GET_ORDERS_FAILED;
  constructor(public payload: { err?: any }) { }
};

export type All
  = GetOrders
  | GetOrdersSuccess
  | GetOrdersFailed;
