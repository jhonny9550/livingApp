import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { COMPONENTS } from "./components/index";
import { PROVIDERS } from "./providers/index";

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [...PROVIDERS],
  entryComponents: [...COMPONENTS]
})
export class AuthSharedModule { }
