import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

export const GET_ORDERS = '[order] get orders';
export const GET_ORDERS_SUCCESS = '[order] get orders success';
export const GET_ORDERS_FAILED = '[order] get orders failed';

export const CREATE_ORDER = '[order] create order';
export const CREATE_ORDER_SUCCESS = '[order] create order success';
export const CREATE_ORDER_FAILED = '[order] create order failed';

export const CHANGE_ORDER_STATUS = '[order] change order status';
export const CHANGE_ORDER_STATUS_SUCCESS = '[order] change order status success';
export const CHANGE_ORDER_STATUS_FAILED = '[order] change order status failed';

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

export class ChangeOrderStatus implements Action {
  readonly type = CHANGE_ORDER_STATUS;
  constructor(public payload: { order: any, status: string, removeView: boolean, loaderMsg: string }) { }
}

export class ChangeOrderStatusSuccess implements Action {
  readonly type = CHANGE_ORDER_STATUS_SUCCESS;
  constructor() { }
}

export class ChangeOrderStatusFailed implements Action {
  readonly type = CHANGE_ORDER_STATUS_FAILED;
  constructor(public payload: { err: any }) { }
}

export type All
  = GetOrders
  | GetOrdersSuccess
  | GetOrdersFailed
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFailed
  | ChangeOrderStatus
  | ChangeOrderStatusSuccess
  | ChangeOrderStatusFailed;
