import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { IBill } from "../models/bill.model";

export const GET_BILLS = '[bill] get bills';
export const GET_BILLS_SUCCESS = '[bill] get bills success';
export const GET_BILLS_FAILED = '[bill] get bills failed';

export class GetBills implements Action {
  readonly type = GET_BILLS;
  constructor(public payload?: IFilter) { }
}

export class GetBillsSuccess implements Action {
  readonly type = GET_BILLS_SUCCESS;
  constructor(public payload: IBill[]) { }
}

export class GetBillsFailed implements Action {
  readonly type = GET_BILLS_FAILED;
  constructor() { }
}

export type All
  = GetBills
  | GetBillsSuccess
  | GetBillsFailed;