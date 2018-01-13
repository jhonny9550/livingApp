import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBillList, IBillModule, IBill } from "../models/bill.model";

import * as billActions from '../actions/bill.actions';

export type Action = billActions.All;

export const initialState: IBillList = { bills: [] };

export function reducer(state: IBillList = initialState, action: Action) {
  switch (action.type) {
    case billActions.GET_BILLS:
    case billActions.CREATE_BILL: {
      return { ...state, loading: true };
    };
    case billActions.GET_BILLS_SUCCESS: {
      return { ...state, loading: false, bills: action.payload };
    };
    case billActions.CREATE_BILL_SUCCESS:  
    case billActions.CREATE_BILL_FAILED:  
    case billActions.GET_BILLS_FAILED: {
      return { ...state, loading: false };
    }; 
    default: {
      return state;
    };
  }
};

export const getBillModule = createFeatureSelector<IBillModule>('billModule');
export const getBillList = createSelector(getBillModule, (state: IBillModule) => state.billList);
export const getProduct = id => createSelector(getBillList, (state: IBillList) => state.bills.find(el => el.id === id));
