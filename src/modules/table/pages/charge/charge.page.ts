import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";

import { IBill, DEFAULT_BILL_VALUES } from "../../../bill/models/bill.model";
import { ITable, DEFAULT_TABLE_VALUES } from "../../models/table.model";
import { IUser } from '../../../auth/models/user.model';

import * as fromAuth from '../../../auth/reducers/auth.reducer';
import * as fromTable from '../../reducers/table.reducer';
import * as tableActions from '../../actions/table.actions';
import * as billActions from '../../../bill/actions/bill.actions';

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

  TABLE_STATE = DEFAULT_TABLE_VALUES.STATUS;

  user$: Observable<IUser>;
  table$: Observable<ITable>;

  constructor(
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private store: Store<ITable>
  ) { }

  ngOnInit() {
    this.detail = this.navParams.data;
    this.table$ = this.store.select(fromTable.getTable(this.detail.tableId));
    this.user$ = this.store.select(fromAuth.getUser);
  }

  billRequest(table: ITable) {
    const update_table_data = {
      status: 'bill_pendent',
      bill_detail: {
        subtotal: this.detail.subtotal,
        service: this.detail.service,
        total: this.detail.total
      }
    };
    const billData: IBill = {
      detail: update_table_data.bill_detail,
      orders: table.orders,
      status: DEFAULT_BILL_VALUES.STATUS.PENDING,
      table: table.id
    }
    this.store.dispatch(new tableActions.UpdateTable({ tableId: this.detail.tableId, data: update_table_data }));
    this.store.dispatch(new billActions.CreateBill(billData));
  }

}