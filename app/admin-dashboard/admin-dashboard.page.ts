import { Component, OnInit } from '@angular/core';
import {/*MenuController,*/ NavController, AlertController/*, IonicModule*/} from '@ionic/angular';
import {IonicPage} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {UtilityService} from '../Providers/utility/utility.service';
import {  MenuController } from '@ionic/angular';



@IonicPage()


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  public appVersionNumber: any;


  constructor(  /*public menuCtrl: MenuController,*/
                public navCtrl: NavController,public menuCtrl: MenuController, public storage:Storage,public alertCtrl:AlertController,
                public utilityProvider:UtilityService,public appVersion: AppVersion)

  {
    this.appVersion.getVersionNumber().then(value => {
      this.appVersionNumber = value;
    }).catch(err => {
      alert(err);
    });
  }

  ngOnInit() {
    console.log('ionViewDidLoad AdminDashboardPage');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  async openOrderList() {
    await this.navCtrl.navigateForward(['/order-list1']);
  }

  async openLedger() {
    await this.navCtrl.navigateForward(['/ledger']);
  }
  async openBlock() {
    await this.navCtrl.navigateForward(['/search-item']);
  }

  async getReceipt() {
    await this.navCtrl.navigateForward(['/receivable']);
  }

  async viewBill() {
    await this.navCtrl.navigateForward(['/view-bill']);
  }

  async logout() {
    this.utilityProvider.CrCn = null;
    this.utilityProvider.CompId = null;
    await this.storage.set('CrCn', this.utilityProvider.CrCn);
    await this.storage.set('CompId', this.utilityProvider.CompId);
    await this.navCtrl.navigateRoot(['/login-with-option']);
  }

  async presentConfirm(title, msg) {
    let alert =await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Disagree');
            // this.menuCtrl.close();

          }
        },
        {
          text: 'YES',
          handler: () => {
            console.log('Agree');
            // this.menuCtrl.close();
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  async registeredCustomer() {
    await this.navCtrl.navigateForward(['/customer-registration']);
  }


}
