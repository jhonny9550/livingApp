import { Component } from '@angular/core';
import { WaiterProfilePage } from "../waiter-profile/waiter-profile.page";
import { WaiterTablesPage } from "../waiter-tables/waiter-tables.page";

@Component({
  selector: 'app-waiter-tabs',
  templateUrl: 'waiter-tabs.page.html'
})

export class WaiterTabsPage {

  tab1 = WaiterProfilePage;
  tab2 = WaiterTablesPage;

  constructor() { }

  ngOnInit() { }


}