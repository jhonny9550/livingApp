import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { PROVIDERS } from "./providers/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./reducers/bill.reducer";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('billModule', { billList: reducer }),
    EffectsModule.forFeature([])
  ],
  exports: [],
  declarations: [],
  providers: [...PROVIDERS],
})
export class BillSharedModule { }
