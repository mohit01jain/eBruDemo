import { Injectable } from '@angular/core';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  constructor(private navCtrl: NavController) {}
    async swipe(e, index: number) {
      if (e.angle < -90) {
        if (index === 1) {
          await this.navCtrl.navigateRoot('order-list/tab-order-list');
        } else if (index === 2) {
          await this.navCtrl.navigateRoot('order-list/tab-order-compelete');
        }
      } else if (e.angle < 0) {
        if (index === 2) {
         await this.navCtrl.navigateRoot('order-list/pending-orders');
        } else if (index === 3) {
          await this.navCtrl.navigateRoot('order-list/tab-order-list');
        }
      } else if (e.angle < 90) {
        if (index === 2) {
          await this.navCtrl.navigateRoot('order-list/pending-orders');
        } else if (index === 3) {
          await this.navCtrl.navigateRoot('order-list/tab-order-list');
        }
      } else {
        if (index === 1) {
          await this.navCtrl.navigateRoot('order-list/tab-order-list');
        } else if (index === 2) {
          await this.navCtrl.navigateRoot('order-list/tab-order-compelete');
        }
      }
    }


}
