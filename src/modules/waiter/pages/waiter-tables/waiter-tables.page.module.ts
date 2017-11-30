import { NgModule } from '@angular/core';

import { WaiterTablesPage } from './waiter-tables.page';
import { IonicPageModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicPageModule.forChild(WaiterTablesPage)
  ],
  exports: [WaiterTablesPage],
  declarations: [WaiterTablesPage],
  providers: [],
  entryComponents: [WaiterTablesPage]
})
export class WaiterTablesPageModule { }
