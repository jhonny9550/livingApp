import { IFilter } from "../../shared/models/filter.model";

export interface ITable {
  id: string;
  number: string;
  type: string;
  available: boolean;
  orders?: string[];
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
