import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IFilter } from "../../shared/models/filter.model";
import { ITable, DEFAULT_TABLE_VALUES } from "../models/table.model";

@Injectable()
export class TableProvider {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getTables(filter?: IFilter) {
    return this.afStore.collection(`/tables`, ref => filter ? ref.orderBy(filter.field).startAt(filter.value).endAt(filter.value + '\uf8ff') : ref)
      .valueChanges()
      .map((data: ITable[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

  getTableRef(id: string) {
    return this.afStore.doc(`/tables/${id}`).ref;
  }

  addOrder(table: any, order: any) {
    return this.afStore.firestore.runTransaction(transaction => {
      return transaction.get(table).then(tableDoc => {
        let currentOrders: Array<any> = tableDoc.data().orders;
        currentOrders.push(order);
        transaction.update(table, { orders: currentOrders, status: DEFAULT_TABLE_VALUES.STATUS.BUSY });
        return currentOrders;
      });
    });
  }

}