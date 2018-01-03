export interface IOrder {
  id: string;
  table: string;
  status: string;
  user: string;
  created_at: string;
  finish_at?: string;
  loading?: boolean;
  error?: any;
};
