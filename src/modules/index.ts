import { AuthModule } from "./auth/auth.module";
import { WaiterModule } from "./waiter/waiter.module";
import { TableModule } from "./table/table.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { CashierModule } from "./cashier/cashier.module";
import { BillModule } from "./bill/bill.module";

export const MODULES = [
  AuthModule,
  WaiterModule,
  TableModule,
  ProductModule,
  OrderModule,
  CashierModule,
  BillModule
];
