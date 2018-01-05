import { Component } from '@angular/core';
import { ViewController, AlertController } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";
import { IProductList, IProduct } from "../../models/product.model";

import * as fromProduct from '../../reducers/product.reducer';
import * as productActions from '../../actions/product.actions';

@Component({
  selector: 'page-select-product',
  templateUrl: 'select-product.page.html'
})

export class SelectProductPage {

  productList$: Observable<IProductList>;
  quantity: number = 1;
  searchInput: string = '';

  constructor(
    public viewCtrl: ViewController,
    private store: Store<IProductList>,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { 
    this.productList$ = this.store.select(fromProduct.getProductList);
    this.store.dispatch(new productActions.GetProducts());
  }

  search(e) {
    if (this.searchInput.toLowerCase().trim() !== '') {
      this.store.dispatch(new productActions.GetProducts({ filter: { field: 'name', value: this.searchInput.toLowerCase() } }));
    } else {
      this.store.dispatch(new productActions.GetProducts());
    }
  }

  cancelSearch() {
    this.searchInput = '';
    this.store.dispatch(new productActions.GetProducts());
  }
  
  add() {
    this.quantity++;
  }

  remove() {
    if (this.quantity > 1) this.quantity--;
  }

  itemSelected(item: IProduct) {
    this.alertCtrl.create({
      title: 'Agregar producto',
      message: `¿Añadir ${this.quantity} de ${item.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            this.viewCtrl.dismiss({ item: item.id, quantity: this.quantity });
          }
        }
      ]
    }).present();
  }

}