import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { COMPONENTS } from "./components/index";
import { PROVIDERS } from "./providers/index";
import { StoreModule } from "@ngrx/store";
import { reducer } from './reducers/auth.reducer';

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('userModule', { user: reducer })
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [...PROVIDERS],
  entryComponents: [...COMPONENTS]
})
export class AuthSharedModule { }
