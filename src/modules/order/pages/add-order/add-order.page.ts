import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.page.html'
})

export class AddOrderPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) { }

  ngOnInit() { 
    console.log('Nav params: ', this.navParams.data);
  }

}