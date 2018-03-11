import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { PAGES } from "./pages/index";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  exports: [...PAGES],
  declarations: [...PAGES],
  providers: [],
  entryComponents: [...PAGES]
})
export class CashierSharedModule { }
