import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from "ionic-angular";
import { Store } from "@ngrx/store";
import { SelectProductPage } from "../../../product/pages/select-product/select-product.page";

import { ITable } from "../../../table/models/table.model";
import { IOrderProduct, IOrder } from "../../models/order.model";

import * as orderActions from '../../actions/order.actions';

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.page.html'
})

export class AddOrderPage {

  products: IOrderProduct[] = [];
  currentTable: ITable;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.currentTable = this.navParams.data;
    console.log('Current table: ', this.currentTable);
  }

  addProduct() {
    const modal = this.modalCtrl.create(SelectProductPage);
    modal.present();
    modal.onDidDismiss((product: IOrderProduct) => {
      if (product) {
        if (this.products.find(el => el.item.id === product.item.id)) {
          this.products = this.products.map(el => el.item.id === product.item.id ? { ...el, quantity: el.quantity + product.quantity } : el);
        } else {
          this.products.push(product);
        }
      }
    });
  }

  getTotalAmount() {
    return this.products.reduce((total, next) => {
      const item = document.getElementById(next.item.id);
      if (item) {
        const itemText = item.innerText;
        const nextAmount = parseInt(itemText);
        return total + nextAmount;
      } else {
        return total;
      }
    }, 0)
  }

  createOrder() {
    const newOrder: IOrder = {
      products: this.products,
      status: 'cashier_pendent',
      table: this.currentTable.id,
      total_amount: this.getTotalAmount()
    };
    this.store.dispatch(new orderActions.CreateOrder(newOrder));
  }

  removeProduct(index: number) {
    this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Quitar producto de la orden',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => { this.products.splice(index, 1) }
        }
      ]
    }).present();
  }

}