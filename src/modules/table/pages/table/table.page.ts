import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ITable } from "../../models/table.model";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store";

import { AddOrderPage } from "../../../order/pages/add-order/add-order.page";

import * as fromTable from '../../reducers/table.reducer';
import { ViewOrderPage } from "../../../order/pages/view-order/view-order.page";

@Component({
  selector: 'page-table',
  templateUrl: 'table.page.html'
})

export class TablePage {

  table$: Observable<ITable>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.table$ = this.store.select(fromTable.getTable(this.navParams.data));
  }

  addOrder(table: ITable) {
    this.navCtrl.push(AddOrderPage, table);
  }

  orderSelected(orderRef: any) {
    this.navCtrl.push(ViewOrderPage, orderRef);
  }

}