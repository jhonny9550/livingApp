import { IFilter } from "../../shared/models/filter.model";

export interface IProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  cuantity: number;
  brand: string;
  available: boolean;
  discount?: number;
  label?: string;
  info?: string;
  loading?: boolean;
  error?: any;
};

export interface IProductList {
  products: IProduct[];
  filter?: IFilter;
  loading?: boolean;
  error?: any;
}

export interface IProductModule {
  productList: IProductList;
}
