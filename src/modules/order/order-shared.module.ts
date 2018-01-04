import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PROVIDERS } from "./providers/index";
import { EFFECTS } from "./effects/index";
import { reducer } from "./reducers/order.reducer";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('orderModule', { orderList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [],
  declarations: [],
  providers: [...PROVIDERS],
})
export class OrderSharedModule { }
