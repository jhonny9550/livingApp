import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})

export class LoginPage {

  authForm: FormGroup

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    
  }

}