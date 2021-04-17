import { Component, OnInit } from '@angular/core';
import {NavController, /*NavParams,*/ Platform} from '@ionic/angular';
/*
import {HomePage} from '../home/home.page';
*/
import { Storage } from '@ionic/storage';
import {IonicPage} from 'ionic-angular';

declare var window;
@IonicPage()
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {


  public cName: any;
  public cAddress1: any;
  public cAddress2: any;
  public cAddress3: any;
  public cPincode: any;
  public cPhone1: any;
  public cPhone2: any;
  public cStateName: any;
  public cStateCode: any;
  public cCity: any;
  public cEMailID: any;

  public compData: any;


  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/public platform: Platform,private storage: Storage) {
    this.storage.get('userInfo').then((value) => {
      this.compData = value;
      this.cName = value.CompanyName;
      this.cAddress1 = value.CompanyAddress1;
      this.cAddress2 = value.CompanyAddress2;
      this.cAddress3 = value.CompanyAddress3;
      this.cPincode = value.CompanyPinCode;
      this.cPhone1 = value.CompanyPhone1;
      this.cPhone2 = value.CompanyPhone2;
      this.cStateName = value.CompanyStateName;
      this.cStateCode = value.CompanyStateCode;
      this.cCity = value.CompanyCity;
      this.cEMailID = value.CompanyEMailID;
      console.log('-CDetails--RS-' + this.cName);
      console.log('-CDetails--RS-' + this.cAddress1 );
      console.log('-CDetails--RS-' + this.cAddress2 );
      console.log('-CDetails--RS-' + this.cAddress3 );
      console.log('-CDetails--RS-' + this.cPincode );
      console.log('-CDetails--RS-' + this.cPhone1 );
      console.log('-CDetails--RS-' + this.cPhone2 );
      console.log('-CDetails--RS-' + this.cStateName );
      console.log('-CDetails--RS-' + this.cStateCode );
      console.log('-CDetails--RS-' + this.cCity );
      console.log('-CDetails--RS-' + this.cEMailID );

      console.log('User DAta -----', JSON.stringify(this.compData));
    });

  }




  ngOnInit() {
    console.log('ionViewDidLoad ContactUsPage');

  }

  async gotoHomePage() {
    await this.navCtrl.navigateForward(['/home']);
  }



}
