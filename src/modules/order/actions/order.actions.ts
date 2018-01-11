import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

export const GET_ORDERS = '[order] get orders';
export const GET_ORDERS_SUCCESS = '[order] get orders success';
export const GET_ORDERS_FAILED = '[order] get orders failed';

export const CREATE_ORDER = '[order] create order';
export const CREATE_ORDER_SUCCESS = '[order] create order success';
export const CREATE_ORDER_FAILED = '[order] create order failed';

export const CANCEL_ORDER = '[order] cancel order';
export const CANCEL_ORDER_SUCCESS = '[order] cancel order success';
export const CANCEL_ORDER_FAILED = '[order] cancel order failed';

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

export class CreateOrder implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: IOrder) { }
}

export class CreateOrderSuccess implements Action {
  readonly type = CREATE_ORDER_SUCCESS;
  constructor() { }
}

export class CreateOrderFailed implements Action {
  readonly type = CREATE_ORDER_FAILED;
  constructor(public payload: { err: any }) { }
}

export class CancelOrder implements Action {
  readonly type = CANCEL_ORDER;
  constructor(public payload: any) { }
}

export class CancelOrderSuccess implements Action {
  readonly type = CANCEL_ORDER_SUCCESS;
  constructor() { }
}

export class CancelOrderFailed implements Action {
  readonly type = CANCEL_ORDER_FAILED;
  constructor(public payload: { err: any }) { }
}

export type All
  = GetOrders
  | GetOrdersSuccess
  | GetOrdersFailed
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFailed
  | CancelOrder
  | CancelOrderSuccess
  | CancelOrderFailed;
