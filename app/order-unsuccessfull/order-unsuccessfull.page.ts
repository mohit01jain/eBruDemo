import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-order-unsuccessfull',
  templateUrl: './order-unsuccessfull.page.html',
  styleUrls: ['./order-unsuccessfull.page.scss'],
})
export class OrderUnsuccessfullPage implements OnInit {

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async goToHome() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    await this.navCtrl.navigateRoot(['/home']);
    loading.dismiss();
  }


}
