export interface ITable {
  id: string;
  number: string;
  type: string;
  available: boolean;
  loading?: boolean;
  error?: any;
};
