import { NgModule } from '@angular/core';

import { WaiterTabsPage } from './waiter-tabs.page';
import { IonicPageModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicPageModule.forChild(WaiterTabsPage)
  ],
  exports: [WaiterTabsPage],
  declarations: [WaiterTabsPage],
  providers: [],
  entryComponents: [WaiterTabsPage]
})
export class WaiterTabsPageModule { }
