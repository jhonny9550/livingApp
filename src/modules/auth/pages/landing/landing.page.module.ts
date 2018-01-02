import { NgModule } from '@angular/core';

import { LandingPage } from './landing.page';
import { IonicPageModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicPageModule.forChild(LandingPage)
  ],
  exports: [LandingPage],
  declarations: [LandingPage],
  providers: [],
  entryComponents: [LandingPage]
})
export class LandingPageModule { }
