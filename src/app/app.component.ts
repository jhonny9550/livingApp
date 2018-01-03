import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LandingPage } from "../modules/auth/pages/landing/landing.page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }
}

