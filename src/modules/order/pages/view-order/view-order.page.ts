import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from "ionic-angular";
import { OrderProvider } from "../../providers/order.provider";
import { Observable } from "rxjs/Rx";
import { IOrder } from "../../models/order.model";

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
    private orderProvider: OrderProvider
  ) { }

  ngOnInit() { 
    this.order$ = this.orderProvider.getOrderByRef(this.navParams.data);
  }

}