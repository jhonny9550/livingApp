import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { COMPONENTS } from "./components/index";
import { PROVIDERS } from "./providers/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from './reducers/auth.reducer';
import { EFFECTS } from "./effects/index";

@NgModule({
  imports: [
    IonicModule,
    StoreModule.forFeature('userModule', { user: reducer }),
    EffectsModule.forFeature(EFFECTS),
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [...PROVIDERS],
  entryComponents: [...COMPONENTS]
})
export class AuthSharedModule { }
