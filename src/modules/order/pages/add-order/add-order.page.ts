import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ITable } from "../../../table/models/table.model";
import { IOrderProduct } from "../../models/order.model";
import { SelectProductPage } from "../../../product/pages/select-product/select-product.page";

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
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.currentTable = this.navParams.data;
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

}