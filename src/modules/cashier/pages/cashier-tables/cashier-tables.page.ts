import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { TablePage } from "../../../table/pages/table/table.page";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store/src";

import { ITableList, ITable } from "../../../table/models/table.model";

import * as fromTable from '../../../table/reducers/table.reducer';
import * as tableActions from '../../../table/actions/table.actions';

@Component({
  selector: 'page-cashier-tables',
  templateUrl: 'cashier-tables.page.html'
})

export class CashierTablesPage {

  tableList$: Observable<ITableList>;

  constructor(
    private store: Store<ITableList>,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.store.dispatch(new tableActions.GetTables());
    this.tableList$ = this.store.select(fromTable.getTableList);
  }

  tableSelected(table: ITable) {
    this.navCtrl.push(TablePage, table.id);
  }

}