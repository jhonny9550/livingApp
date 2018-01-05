import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./reducers/product.reducer";
import { EFFECTS } from "./effects/index";
import { PROVIDERS } from "./providers/index";
import { PAGES } from "./pages/index";
import { SharedModule } from "../shared/shared.module";
import { PIPES } from "./pipes/index";

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    StoreModule.forFeature('productModule', { productList: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [...PAGES, ...PIPES],
  declarations: [...PAGES, ...PIPES],
  providers: [...PROVIDERS, ...PIPES],
  entryComponents: [...PAGES]
})
export class ProductSharedModule { }
