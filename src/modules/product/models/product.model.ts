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
