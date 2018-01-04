import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./reducers/product.reducer";
import { EFFECTS } from "./effects/index";
import { PROVIDERS } from "./providers/index";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('productModule', { productList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [],
  declarations: [],
  providers: [...PROVIDERS],
})
export class ProductSharedModule { }
