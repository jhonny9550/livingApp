import { Component } from '@angular/core';
import { BarmanProfilePage } from '../barman-profile/barman-profile.page';
import { BarmanTablesPage } from '../barman-tables/barman-tables.page';

@Component({
  selector: 'page-barman-tabs',
  templateUrl: 'barman-tabs.page.html'
})

export class BarmanTabsPage {

  tab1: BarmanProfilePage;
  tab2: BarmanTablesPage;

  constructor() { }

  ngOnInit() { }
  
}
