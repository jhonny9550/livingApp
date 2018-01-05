import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { IFilter } from "../../shared/models/filter.model";
import { IProduct } from "../models/product.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProductProvider {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  getProducts(filter?: IFilter) {
    return this.afDatabase.list(`/products`, ref => filter ? ref.orderByChild(filter.field).startAt(filter.value) : ref)
      .valueChanges()
      .map((data: IProduct[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getProduct(id: string): Observable<IProduct> {
    return this.afDatabase.object(`/products/${id}`)
      .valueChanges()
      .map((data: IProduct) => { if (data) return data; else throw 'Error consultando datos' });
  }

}