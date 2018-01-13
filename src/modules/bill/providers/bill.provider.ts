import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from "angularfire2/firestore";
import { IFilter } from "../../shared/models/filter.model";
import { IBill } from "../models/bill.model";
import { Observable } from "rxjs/Rx";

import * as firebase from 'firebase';

@Injectable()
export class BillProvider {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getBills(filter?: IFilter) {
    return this.afStore.collection(`/bills`, ref => filter ? ref.orderBy(filter.field).startAt(filter.value).endAt(filter.value + '\uf8ff') : ref)
      .valueChanges()
      .map(data => { if (data) return data; else throw 'Not bills data found' });
  }

  getBillByRef(ref: any): Observable<IBill> {
    return fromDocRef(ref)
      .map(snap => snap.payload.data())
      .map((bill: IBill) => { if (bill) return bill; else throw 'Error consultando datos' })
  }

  getBillRef(id: string) {
    return this.afStore.doc(`/bills/${id}`).ref;
  }

  createBill(bill: IBill) {
    console.log('Bill to create: ', bill);
    const billKey = this.afStore.createId();
    const newBill = { ...bill, created_at: firebase.firestore.FieldValue.serverTimestamp(), id: billKey };
    return this.afStore.doc(`/bills/${billKey}`).set(newBill)
      .then(() => newBill);
  }

}