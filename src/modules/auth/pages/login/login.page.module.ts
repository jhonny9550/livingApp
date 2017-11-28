import { NgModule } from '@angular/core';

import { LoginPage } from './login.page';
import { IonicPageModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [LoginPage],
  declarations: [LoginPage],
  providers: [],
  entryComponents: [LoginPage]
})
export class LoginPageModule { }
