import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";
import { OrderProvider } from "../../providers/order.provider";
import { IOrder, DEFAULT_ORDER_VALUES } from "../../models/order.model";

import { ViewProductPage } from "../../../product/pages/view-product/view-product.page";

import * as orderActions from '../../actions/order.actions';

@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.page.html'
})

export class ViewOrderPage {

  order$: Observable<IOrder>;
  ORDER_STATE = DEFAULT_ORDER_VALUES.STATUS;

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

  productSelected(productRef: any) {
    this.modalCtrl.create(ViewProductPage, productRef).present();
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
            this.store.dispatch(new orderActions.ChangeOrderStatus(this.navParams.data));
          }
        }
      ]
    }).present();
  }

  deliverOrder() {
    this.alertCtrl.create({
      title: 'Importante',
      message: 'Al entregar el pedido no se podrá cancelar la orden',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            this.store.dispatch(new orderActions.ChangeOrderStatus({ loaderMsg: 'Entregando pedido', order: this.navParams.data, removeView: true, status: this.ORDER_STATE.DELIVERED }));
          }
        }
      ]
    }).present();
  }

}