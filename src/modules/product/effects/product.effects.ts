import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { ProductProvider } from "../providers/product.provider";

import * as productActions from '../actions/product.actions';
import { IFilter } from "../../shared/models/filter.model";
import { IProduct } from "../models/product.model";

@Injectable()
export class ProductEffects {

  @Effect()
  getProducts$: Observable<Action> = this.actions
    .ofType(productActions.GET_PRODUCTS)
    .map(toPayload)
    .switchMap((payload?: { filter: IFilter }) => this.productProvider.getProducts(payload ? payload.filter : null))
    .map((products: IProduct[]) => new productActions.GetProductsSuccess(products))
    .catch(err => Observable.of(new productActions.GetProductsFailed({ err })));
  
  @Effect()
  getProductsFailed$: Observable<Action> = this.actions
    .ofType(productActions.GET_PRODUCTS_FAILED)
    .map(toPayload)
    .do((payload: { err: any }) => this.presentToast(payload.err || 'Server error'))
    .switchMap((payload: { err: any }) => []);

  constructor(
    private actions: Actions,
    private productProvider: ProductProvider,
    private toastCtrl: ToastController
  ) { }

  presentToast(message: string, duration: number = 4000, position: string = 'bottom', showCloseButton: boolean = true) {
    this.toastCtrl.create({
      duration,
      message,
      position,
      closeButtonText: 'Ok',
      showCloseButton
    }).present();
  }
}