import { ITableList, ITableModule } from "../models/table.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as tableActions from '../actions/table.actions';

export type Action = tableActions.All;

export const initialState: ITableList = { tables: [] };

export function reducer(state: ITableList = initialState, action: Action) {
  switch (action.type) {
    case tableActions.GET_TABLES: {
      return { ...state, loading: true };
    }
    case tableActions.GET_TABLES_SUCCESS: {
      console.log('Success tables fetching: ', action.payload);
      return { ...state, ...action.payload , loading: false };
    }
    case tableActions.GET_TABLES_FAILED: {
      console.log('Failes tables fetching: ', action.payload);
      return { ...initialState, loading: false, error: action.payload.err };
    }
    default: {
      return state;
    }
  }
};

export const getTableModule = createFeatureSelector<ITableModule>('tableModule');
export const getTableList = createSelector(getTableModule, (state: ITableModule) => state.tableList);
