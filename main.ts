import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import {Platform} from 'ionic-angular';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

export class MyAppComponent {
  constructor(
      public platform: Platform,
      public splashscreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      this.splashscreen.hide();
    });
  }
}