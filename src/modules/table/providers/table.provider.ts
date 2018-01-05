import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IFilter } from "../../shared/models/filter.model";
import { ITable } from "../models/table.model";

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

}