import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";

import { ITable } from "../../models/table.model";

import * as fromTable from '../../reducers/table.reducer';
import * as tableActions from '../../actions/table.actions';

@Component({
  selector: 'page-charge',
  templateUrl: 'charge.page.html'
})

export class ChargePage {

  detail: {
    total: number;
    subtotal: number;
    service: number;
    tableId: string;
  };

  table$: Observable<ITable>;

  constructor(
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private store: Store<ITable>
  ) { }

  ngOnInit() {
    this.detail = this.navParams.data;
    this.table$ = this.store.select(fromTable.getTable(this.detail.tableId));
  }

  billRequest() {
    const update_table_data = {
      status: 'bill_pendent',
      bill_detail: {
        subtotal: this.detail.subtotal,
        service: this.detail.service,
        total: this.detail.total
      }
    };
    this.store.dispatch(new tableActions.UpdateTable({ tableId: this.detail.tableId, data: update_table_data }));
  }

}