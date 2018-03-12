import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../../../auth/models/user.model';

import * as fromAuth from '../../../auth/reducers/auth.reducer';
import * as authActions from '../../../auth/actions/auth.actions';

@Component({
  selector: 'page-barman-profile',
  templateUrl: 'barman-profile.page.html'
})

export class BarmanProfilePage {

  user$: Observable<IUser>;

  constructor(
    private store: Store<any>,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { 
    this.user$ = this.store.select(fromAuth.getUser);
  }

  logout() {
    this.alertCtrl.create({
      title: 'Salir',
      message: '¿Seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          role: 'cancel',
          handler: () => {
            this.store.dispatch(new authActions.Logout());
          }
        }
      ]
    }).present();
  }

}
