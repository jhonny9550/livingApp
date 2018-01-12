import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from "ionic-angular";
import { ITable } from "../../models/table.model";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store";

import { AddOrderPage } from "../../../order/pages/add-order/add-order.page";
import { ViewOrderPage } from "../../../order/pages/view-order/view-order.page";

import * as fromTable from '../../reducers/table.reducer';
import * as tableActions from '../../actions/table.actions';
import { ChargePage } from "../charge/charge.page";

@Component({
  selector: 'page-table',
  templateUrl: 'table.page.html'
})

export class TablePage {

  table$: Observable<ITable>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
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

  charge(table: ITable) {
    if (table.status === 'bill_pendent') {
      const chargeDetail = {
        service: table.bill_detail.service,
        subtotal: table.bill_detail.subtotal,
        total: table.bill_detail.total,
        tableId: table.id
      };
      this.modalCtrl.create(ChargePage, chargeDetail).present();
    } else {
      this.alertCtrl.create({
        title: 'Cobrar',
        message: 'Generar cobro para la mesa',
        inputs: [
          {
            type: 'checkbox',
            name: 'service',
            id: 'service',
            label: 'Incluír el servicio en la cuenta',
            checked: true
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Aceptar',
            role: 'cancel',
            handler: data => {
              this.store.dispatch(new tableActions.Charge({ table, service: data.length > 0 }))
            }
          }
        ]
      }).present();
    }
  }

}