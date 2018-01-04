import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { IFilter } from "../../shared/models/filter.model";
import { IOrder } from "../models/order.model";

@Injectable()
export class OrderProvider {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  getOrders(filter?: IFilter) {
    return this.afDatabase.list(`/orders`, ref => filter ? ref.orderByChild(filter.field).startAt(filter.value) : ref)
      .valueChanges()
      .map((data: IOrder[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

}