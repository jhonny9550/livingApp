import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { IBill } from "../models/bill.model";

export const GET_BILLS = '[bill] get bills';
export const GET_BILLS_SUCCESS = '[bill] get bills success';
export const GET_BILLS_FAILED = '[bill] get bills failed';

export const CHANGE_STATUS = '[bill] change status';
export const CHANGE_STATUS_SUCCESS = '[bill] change status success';
export const CHANGE_STATUS_FAILED = '[bill] change status failed';

export const CREATE_BILL = '[bill] create bill';
export const CREATE_BILL_SUCCESS = '[bill] create bill success';
export const CREATE_BILL_FAILED = '[bill] create bill failed';

export class GetBills implements Action {
  public readonly type = GET_BILLS;
  constructor(public payload?: IFilter) { }
};

export class GetBillsSuccess implements Action {
  public readonly type = GET_BILLS_SUCCESS;
  constructor(public payload: IBill[]) { }
};

export class GetBillsFailed implements Action {
  public readonly type = GET_BILLS_FAILED;
  constructor(public payload: { err: any }) { }
};

export class ChangeStatus implements Action {
  public readonly type = CHANGE_STATUS;
  constructor(public payload: { bill: any, status: string, removeView: boolean, loaderMsg: string }) { }
};

export class ChangeStatusSuccess implements Action {
  public readonly type = CHANGE_STATUS_SUCCESS;
  constructor() { }
}

export class ChangeStatusFailed implements Action {
  public readonly type = CHANGE_STATUS_FAILED;
  constructor(public payload: { err: any }) { }
}

export class CreateBill implements Action {
  public readonly type = CREATE_BILL;
  constructor(public payload: IBill) { }
}

export class CreateBillSuccess implements Action {
  public readonly type = CREATE_BILL_SUCCESS;
  constructor() { }
}

export class CreateBillFailed implements Action {
  public readonly type = CREATE_BILL_FAILED;
  constructor(public payload: { err: any }) { }
}

export type All
  = GetBills
  | GetBillsSuccess
  | GetBillsFailed
  | ChangeStatus
  | ChangeStatusSuccess
  | ChangeStatusFailed
  | CreateBill
  | CreateBillSuccess
  | CreateBillFailed;
