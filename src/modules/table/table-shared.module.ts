import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./reducers/table.reducer";
import { EFFECTS } from "./effects/index";
import { PROVIDERS } from "./providers/index";
import { PAGES } from "./pages/index";
import { OrderSharedModule } from "../order/order-shared.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    OrderSharedModule,
    SharedModule,
    StoreModule.forFeature('tableModule', { tableList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [...PAGES],
  declarations: [...PAGES],
  providers: [...PROVIDERS],
  entryComponents: [...PAGES]
})
export class TableSharedModule { }
