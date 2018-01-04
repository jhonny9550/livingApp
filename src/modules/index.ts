import { AuthModule } from "./auth/auth.module";
import { WaiterModule } from "./waiter/waiter.module";
import { TableModule } from "./table/table.module";
import { ProductModule } from "./product/product.module";

export const MODULES = [
  AuthModule,
  WaiterModule,
  TableModule,
  ProductModule
];
