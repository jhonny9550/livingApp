import { ITableList, ITableModule } from "../models/table.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as tableActions from '../actions/table.actions';

export type Action = tableActions.All;

export const initialState: ITableList = { tables: [] };

export function reducer(state: ITableList = initialState, action: Action) {
  switch (action.type) {
    case tableActions.GET_TABLES: {
      return { ...state, loading: true };
    };
    case tableActions.GET_TABLES_SUCCESS: {
      return { ...state, ...action.payload, loading: false };
    };
    case tableActions.GET_TABLES_FAILED: {
      return { ...initialState, loading: false, error: action.payload.err };
    };
    case tableActions.CHARGE:
    case tableActions.CHARGE_SUCCESS:
    case tableActions.CHARGE_FAILED:
    case tableActions.UPDATE_TABLE:  {
      return state;
    };
    default: {
      return state;
    }
  }
};

export const getTableModule = createFeatureSelector<ITableModule>('tableModule');
export const getTableList = createSelector(getTableModule, (state: ITableModule) => state.tableList);
export const getTable = id => createSelector(getTableList, (state: ITableList) => state.tables.find(el => el.id === id));

