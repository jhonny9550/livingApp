import { AuthModule } from "./auth/auth.module";
import { WaiterModule } from "./waiter/waiter.module";
import { TableModule } from "./table/table.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";

export const MODULES = [
  AuthModule,
  WaiterModule,
  TableModule,
  ProductModule,
  OrderModule
];
