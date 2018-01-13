import { Component } from '@angular/core';
import { CashierProfilePage } from "../cashier-profile/cashier-profile.page";
import { CashierTablesPage } from "../cashier-tables/cashier-tables.page";

@Component({
  selector: 'page-cashier-tabs',
  templateUrl: 'cashier-tabs.page.html'
})

export class CashierTabsPage {

  tab1 = CashierProfilePage;
  tab2 = CashierTablesPage;

  constructor() { }

  ngOnInit() { }

}