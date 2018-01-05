import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";
import { OrderProvider } from "../../providers/order.provider";
import { IOrder } from "../../models/order.model";

import * as orderActions from '../../actions/order.actions';

@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.page.html'
})

export class ViewOrderPage {

  order$: Observable<IOrder>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private orderProvider: OrderProvider,
    private store: Store<any>
  ) { }

  ngOnInit() { 
    this.order$ = this.orderProvider.getOrderByRef(this.navParams.data);
  }

  cancelOrder() {
    this.alertCtrl.create({
      title: 'Cancelar orden',
      message: '¿Seguro que deseas cancelar esta orden?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí, cancelar',
          role: 'cancel',
          handler: () => {
            this.store.dispatch(new orderActions.CancelOrder(this.navParams.data));
          }
        }
      ]
    }).present();
  }

}