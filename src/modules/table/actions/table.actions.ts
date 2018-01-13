import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { ITable } from '../models/table.model';

export const GET_TABLES = '[table] get tables';
export const GET_TABLES_SUCCESS = '[table] get tables success';
export const GET_TABLES_FAILED = '[table] get tables failed';

export const CHARGE = '[table] charge';
export const CHARGE_SUCCESS = '[table] charge success';
export const CHARGE_FAILED = '[table] charge failed';

export const UPDATE_TABLE = '[table] update table';

export class GetTables implements Action {
  readonly type = GET_TABLES;
  constructor(public payload?: { filter: IFilter }) { }
};

export class GetTablesSuccess implements Action {
  readonly type = GET_TABLES_SUCCESS;
  constructor(public payload: { tables: ITable[] }) { }
}

export class GetTablesFailed implements Action {
  readonly type = GET_TABLES_FAILED;
  constructor(public payload: { err: any }) { }
}

export class Charge implements Action {
  readonly type = CHARGE;
  constructor(public payload: { table: ITable, service: boolean }) { }
}

export class ChargeSuccess implements Action {
  readonly type = CHARGE_SUCCESS;
  constructor(public payload: { total: number, sub_total: number, service?: number, iva?: number }) { }
}

export class ChargeFailed implements Action {
  readonly type = CHARGE_FAILED;
  constructor(public payload: { err: any }) { }
}

export class UpdateTable implements Action {
  readonly type = UPDATE_TABLE;
  constructor(public payload: { tableId: string, data: any }) { }
}

export type All
  = GetTables
  | GetTablesSuccess
  | GetTablesFailed
  | Charge
  | ChargeSuccess
  | ChargeFailed
  | UpdateTable;
