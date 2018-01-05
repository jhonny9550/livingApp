import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from 'angularfire2/firestore';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class OrderProvider {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getOrders(filter?: IFilter) {
    return this.afStore.collection(`/orders`, ref => filter ? ref.orderBy(filter.field).startAt(filter.value) : ref)
    .valueChanges()
    .map((data: IOrder[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getOrderById(ref): Observable<IOrder> {
    return fromDocRef(ref)
    .map(snap => snap.payload.data())  
    .map((data: IOrder) => { if (data) return data; else throw 'Error consultando datos' });
  }

}