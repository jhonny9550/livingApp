import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ITable } from "../../models/table.model";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store";

import * as fromTable from '../../reducers/table.reducer';

@Component({
  selector: 'page-table',
  templateUrl: 'table.page.html'
})

export class TablePage {

  table$: Observable<ITable>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<ITable>
  ) { }

  ngOnInit() {
    console.log('Nav params: ', this.navParams.data);
    this.table$ = this.store.select(fromTable.getTable(this.navParams.data));
  }

}