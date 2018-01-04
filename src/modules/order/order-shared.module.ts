import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PROVIDERS } from "./providers/index";
import { EFFECTS } from "./effects/index";
import { PAGES } from "./pages/index";
import { reducer } from "./reducers/order.reducer";
import { PIPES } from "./pipes/index";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('orderModule', { orderList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [...PAGES, ...PIPES],
  declarations: [...PAGES, ...PIPES],
  providers: [...PROVIDERS, ...PIPES],
  entryComponents: [...PAGES]
})
export class OrderSharedModule { }
