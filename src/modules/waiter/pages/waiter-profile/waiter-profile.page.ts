import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { IUser } from '../../../auth/models/user.model';
import { Observable } from "rxjs/Rx";
import * as fromAuth from '../../../auth/reducers/auth.reducer';
import * as userActions from '../../../auth/actions/auth.actions';
import { AlertController } from "ionic-angular";

@Component({
  selector: 'page-waiter-profile',
  templateUrl: 'waiter-profile.page.html'
})

export class WaiterProfilePage {

  user$: Observable<IUser>;

  constructor(
    private store: Store<IUser>,
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
            this.store.dispatch(new userActions.Logout());
          }
        }
      ]
    }).present();
  }
}