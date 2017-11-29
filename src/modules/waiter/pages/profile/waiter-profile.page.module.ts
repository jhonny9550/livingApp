import { NgModule } from '@angular/core';

import { WaiterProfilePage } from './waiter-profile.page';
import { IonicPageModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicPageModule.forChild(WaiterProfilePage)
  ],
  exports: [WaiterProfilePage],
  declarations: [WaiterProfilePage],
  providers: [],
  entryComponents: [WaiterProfilePage]
})
export class WaiterProfilePageModule { }
