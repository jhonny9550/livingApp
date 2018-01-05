import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from 'angularfire2/firestore';
import { IFilter } from "../../shared/models/filter.model";
import { IProduct } from "../models/product.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProductProvider {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getProducts(filter?: IFilter) {
    return this.afStore.collection(`/products`, ref => filter ? ref.orderBy(filter.field).startAt(filter.value).endAt(filter.value + '\uf8ff') : ref)
      .valueChanges()
      .map((data: IProduct[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getProduct(ref): Observable<IProduct> {
    return fromDocRef(ref)
      .map(snap => snap.payload.data())  
      .map((data: IProduct) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getProductRef(id: string) {
    return this.afStore.doc(`/products/${id}`).ref;
  }

}