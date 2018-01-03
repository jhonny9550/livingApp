import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";
import { PAGES } from "../index";

@IonicPage()
@Component({
  selector: 'app-waiter-tabs',
  templateUrl: 'waiter-tabs.page.html'
})

export class WaiterTabsPage {

  tabPages = PAGES;

  constructor() { }

  ngOnInit() { }


}