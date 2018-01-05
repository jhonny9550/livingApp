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
    console.log('Nav params: ', this.navParams.data);
    this.currentTable = this.navParams.data;
    this.products = [{
      item: 'productId1',
      quantity: 2
    }];
  }

  addProduct() {
    const modal = this.modalCtrl.create(SelectProductPage);
    modal.present();
    modal.onDidDismiss((product: IOrderProduct) => {
      if (product) {
        console.log('Product added: ', product);
        console.log('Pre products: ', this.products);
        this.products = this.products.map(el => el.item === product.item ? { ...el, quantity: el.quantity + product.quantity } : el);
        console.log('Post products: ', this.products);
      }
    });
  }

  getTotalAmount() {
    return this.products.reduce((total, next) => {
      console.log('Item: ', document.getElementById(next.item));
      const item = document.getElementById(next.item);
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