import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PROVIDERS } from "./providers/index";
import { EFFECTS } from "./effects/index";
import { PAGES } from "./pages/index";
import { reducer } from "./reducers/order.reducer";
import { PIPES } from "./pipes/index";
import { ProductSharedModule } from "../product/product-shared.module";
import { TableSharedModule } from "../table/table-shared.module";
import { AuthSharedModule } from "../auth/auth-shared.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    ProductSharedModule,
    AuthSharedModule,
    StoreModule.forFeature('orderModule', { orderList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [...PAGES, ...PIPES],
  declarations: [...PAGES, ...PIPES],
  providers: [...PROVIDERS, ...PIPES],
  entryComponents: [...PAGES]
})
export class OrderSharedModule { }
