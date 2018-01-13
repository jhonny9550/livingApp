import { IFilter } from "../../shared/models/filter.model";

export interface ITable {
  id: string;
  number: string;
  available: boolean;
  status?: string;
  bill_detail?: {
    subtotal: number;
    service: number;
    total: number;
  };
  type?: string;
  capacity?: number;
  clients_served?: number;
  orders?: any[];
  loading?: boolean;
  error?: any;
};

export interface ITableList {
  tables: ITable[];
  filter?: IFilter;
  loading?: boolean;
  error?: any;
};

export interface ITableModule {
  tableList: ITableList;
};

export const DEFAULT_TABLE_VALUES = {
  STATUS: {
    AVAILABLE: 'available',
    BUSY: 'busy',
    BILL_PENDENT: 'bill_pendent'
  }
};