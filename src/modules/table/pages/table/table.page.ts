import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ITable } from "../../models/table.model";

@Component({
  selector: 'page-table',
  templateUrl: 'table.page.html'
})

export class TablePage {

  table: ITable;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.table = this.navParams.data;
  }

}