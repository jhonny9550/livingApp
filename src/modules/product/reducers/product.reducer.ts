import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProductList, IProductModule } from "../models/product.model";

import * as productActions from '../actions/product.actions';

export type Action = productActions.All;

export const initialState: IProductList = { products: [] };

export function reducer(state: IProductList = initialState, action: Action) {
  switch (action.type) {
    case productActions.GET_PRODUCTS: {
      return { ...state, loading: true };
    }
    case productActions.GET_PRODUCTS_SUCCESS: {
      return { ...state, products: action.payload, loading: false };
    }  
    case productActions.GET_PRODUCTS_FAILED: {
      return initialState;
    }  
    default: {
      return state;
    }
  }
};

export const getProductModule = createFeatureSelector<IProductModule>('productModule');
export const getProductList = createSelector(getProductModule, (state: IProductModule) => state.productList);
export const getProduct = id => createSelector(getProductList, (state: IProductList) => state.products.find(el => el.id === id));
