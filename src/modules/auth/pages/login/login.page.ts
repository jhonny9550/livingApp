import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IUser } from '../../models/user.model';
import { Observable } from "rxjs/Rx";
import * as userActions from '../../actions/auth.actions';
import * as fromAuth from '../../reducers/auth.reducer';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})

export class LoginPage {

  authForm: FormGroup;
  user$: Observable<IUser>;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public store: Store<IUser>
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user$ = this.store.select(fromAuth.getUser);
  }

  login() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    this.store.dispatch(new userActions.Login({ email, password }))
    this.authForm.get('password').setValue('');
  }

}