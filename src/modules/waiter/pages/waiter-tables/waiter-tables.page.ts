import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { ITableList, ITable } from "../../../table/models/table.model";
import { Observable } from "rxjs/Rx";
import * as fromTable from '../../../table/reducers/table.reducer';
import * as tableActions from '../../../table/actions/table.actions';
import { NavController } from "ionic-angular";
import { TablePage } from "../../../table/pages/table/table.page";

@Component({
  selector: 'page-waiter-tables',
  templateUrl: 'waiter-tables.page.html'
})

export class WaiterTablesPage {

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
    this.navCtrl.push(TablePage, table);
  }

}