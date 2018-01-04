import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PROVIDERS } from "./providers/index";
import { EFFECTS } from "./effects/index";
import { PAGES } from "./pages/index";
import { reducer } from "./reducers/order.reducer";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('orderModule', { orderList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [...PAGES],
  declarations: [...PAGES],
  providers: [...PROVIDERS],
  entryComponents: [...PAGES]
})
export class OrderSharedModule { }
