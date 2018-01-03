import { Action } from '@ngrx/store';
import { IFilter } from "../../shared/models/filter.model";
import { ITable } from '../models/table.model';

export const GET_TABLES = '[table] get tables';
export const GET_TABLES_SUCCESS = '[table] get tables success';
export const GET_TABLES_FAILED = '[table] get tables failed';

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

export type All
  = GetTables
  | GetTablesSuccess
  | GetTablesFailed;
