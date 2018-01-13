import { IFilter } from "../../shared/models/filter.model";

export interface IBill {
  id?: string;
  orders: any[];
  status: string;
  table: any;
  user?: any;
  detail: {
    service: number;
    subtotal: number;
    total: number;
  }
}

export interface IBillList {
  bills: IBill[];
  filter?: IFilter;
  loading?: boolean;
  error?: any;
};

export interface IBillModule {
  billList: IBillList;
};

export const DEFAULT_BILL_VALUES = {
  STATUS: {
    PENDING: 'pending',
    READY: 'ready',
    DELIVERED: 'delivered'
  }
};
