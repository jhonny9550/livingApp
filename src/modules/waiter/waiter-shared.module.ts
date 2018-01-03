import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { COMPONENTS } from "./components/index";
import { PROVIDERS } from "./providers/index";
import { PAGES } from "./pages/index";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  exports: [
    ...COMPONENTS,
    ...PAGES
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES
  ],
  providers: [...PROVIDERS],
  entryComponents: [
    ...COMPONENTS,
    ...PAGES
  ]
})
export class WaiterSharedModule { }
