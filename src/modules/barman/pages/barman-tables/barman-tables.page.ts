import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TablePage } from '../../../table/pages/table/table.page';

import { ITableList, ITable } from "../../../table/models/table.model";

import * as fromTable from '../../../table/reducers/table.reducer';
import * as tableActions from '../../../table/actions/table.actions';

@Component({
  selector: 'page-barman-tables',
  templateUrl: 'barman-tables.page.html'
})

export class BarmanTablesPage {

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
