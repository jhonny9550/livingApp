import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { PROVIDERS } from "./providers/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./reducers/bill.reducer";
import { EFFECTS } from "./effects/index";
import { AuthSharedModule } from "../auth/auth-shared.module";
import { TableSharedModule } from "../table/table-shared.module";
import { OrderSharedModule } from "../order/order-shared.module";

@NgModule({
  imports: [
    IonicModule,
    AuthSharedModule,
    TableSharedModule,
    OrderSharedModule,
    StoreModule.forFeature('billModule', { billList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [],
  declarations: [],
  providers: [...PROVIDERS],
})
export class BillSharedModule { }
