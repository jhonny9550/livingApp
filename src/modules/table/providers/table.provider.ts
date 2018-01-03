import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { IFilter } from "../../shared/models/filter.model";
import { ITable } from "../models/table.model";

@Injectable()
export class TableProvider {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  getTables(filter?: IFilter) {
    return this.afDatabase.list(`/tables`, ref => filter ? ref.orderByChild(filter.field).startAt(filter.value) : ref)
      .valueChanges()
      .map((data: ITable[]) => { if (data) return data; else throw 'Error consultando datos' });
  }

}