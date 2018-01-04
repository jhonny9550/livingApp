import { Action } from '@ngrx/store';
import { IProduct } from "../models/product.model";
import { IFilter } from "../../shared/models/filter.model";

export const GET_PRODUCTS = '[product] get products';
export const GET_PRODUCTS_SUCCESS = '[product] get products success';
export const GET_PRODUCTS_FAILED = '[product] get products failed';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
  constructor(public payload?: { filter: IFilter }) { }
};

export class GetProductsSuccess implements Action { 
  readonly type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: IProduct[]) { }
}

export class GetProductsFailed implements Action {
  readonly type = GET_PRODUCTS_FAILED;
  constructor(public payload: { err?: any }) { }
}

export type All
  = GetProducts
  | GetProductsSuccess
  | GetProductsFailed;
