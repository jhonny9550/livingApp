import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from 'angularfire2/firestore';
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";
import { Observable } from "rxjs/Rx";

import * as firebase from 'firebase';

@Injectable()
export class OrderProvider {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getOrders(filter?: IFilter) {
    return this.afStore.collection(`/orders`, ref => filter ? ref.orderBy(filter.field).startAt(filter.value).endAt(filter.value + '\uf8ff') : ref)
      .valueChanges()
      .map((data: IOrder[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getOrderByRef(ref): Observable<IOrder> {
    return fromDocRef(ref)
      .map(snap => snap.payload.data())
      .map((data: IOrder) => { if (data) return data; else throw 'Error consultando datos' });
  }

  createOrder(order: IOrder) {
    console.log('Order to save: ', order);
    const orderKey = this.afStore.createId();
    const newOrder = { ...order, created_at: firebase.firestore.FieldValue.serverTimestamp(), id: orderKey };
    return this.afStore.doc(`/orders/${orderKey}`).set(newOrder)
      .then(() => newOrder);
  }

  changeOrderStatus(orderRef: any, status: string) {
    return this.afStore.firestore.runTransaction(transaction => {
      transaction.update(orderRef, { status });
      return Promise.resolve();
    });
  }

  getOrderRef(id: string) {
    return this.afStore.doc(`/orders/${id}`).ref;
  }

}