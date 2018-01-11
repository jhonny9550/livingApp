import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { IProduct } from "../../models/product.model";
import { ProductProvider } from "../../providers/product.provider";

@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.page.html'
})

export class ViewProductPage {

  product$: Observable<IProduct>;

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private productProvider: ProductProvider
  ) { }

  ngOnInit() { 
    this.product$ = this.productProvider.getProductByRef(this.navParams.data);
  }

}