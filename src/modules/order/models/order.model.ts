import { IFilter } from "../../shared/models/filter.model";

export interface IOrder {
  id: string;
  table: string;
  status: string;
  user: string;
  products: string[];
  created_at: string;
  finish_at?: string;
  loading?: boolean;
  error?: any;
};

export interface IOrderList {
  orders: IOrder[];
  filter?: IFilter;
  loading?: boolean;
  error?: any;
}

export interface IOrderModule {
  orderList: IOrderList;
};
