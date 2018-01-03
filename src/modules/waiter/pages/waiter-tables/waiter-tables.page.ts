import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { ITableList } from "../../../table/models/table.model";
import { Observable } from "rxjs/Rx";
import * as fromTable from '../../../table/reducers/table.reducer';
import * as tableActions from '../../../table/actions/table.actions';

@Component({
  selector: 'page-waiter-tables',
  templateUrl: 'waiter-tables.page.html'
})

export class WaiterTablesPage {

  tableList$: Observable<ITableList>;

  constructor(
    private store: Store<ITableList>
  ) { }

  ngOnInit() {
    this.store.dispatch(new tableActions.GetTables());
    this.tableList$ = this.store.select(fromTable.getTableList);
   }

}