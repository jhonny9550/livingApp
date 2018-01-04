import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ITable } from "../../../table/models/table.model";
import { IOrderProduct } from "../../models/order.model";

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.page.html'
})

export class AddOrderPage {

  products: IOrderProduct[] = [];
  currentTable: ITable;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) { }

  ngOnInit() { 
    console.log('Nav params: ', this.navParams.data);
    this.currentTable = this.navParams.data;
    this.products = [{
      item: 'Aguardiente Blanco del Valle',
      quantity: 2
    }];
  }

  addProduct() {

  }

}