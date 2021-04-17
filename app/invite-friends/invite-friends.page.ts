import { Component, OnInit } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {SocialSharing } from '@ionic-native/social-sharing/ngx';
import {Storage} from '@ionic/storage';
/*
import {IonicStorageModule} from '@ionic/storage';
*/


@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.page.html',
  styleUrls: ['./invite-friends.page.scss'],
})
export class InviteFriendsPage implements OnInit {

  public referralCode:any;
  public compData: any;
  public cName: any;

  public msg:any ;
  public groupKeyTabsy: any;



  constructor(public navCtrl: NavController,
              public platform: Platform,
              public emailComposer: EmailComposer,
              public smsVar: SMS,
              public socialSharing: SocialSharing,
              public storage:Storage) {

    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " +  this.groupKeyTabsy)
    });

    this.storage.get('userInfo').then((value) => {
      this.compData = value;
      this.cName = value.CompanyName;

      console.log('-CDetails--RS-' + this.cName);

      console.log('User DAta -----', JSON.stringify(this.compData));
    });

    this.storage.get('ReferralCode').then(value => {
      this.referralCode = value;
      console.log("ReferralCode = "+this.referralCode);
      // this.msg = 'Get all the grocery items on one click at your place. Sign up with my referral code '+this.referralCode+ ' and avail benefits. Download the Rajdhani Grocery app from https://play.google.com/store/apps/details?id=io.ionic.starter.tabsy';
      // this.msg = 'Get all the grocery items on one click at your place. Sign up with my Referral code :'+this.referralCode+' with Store Code :'+this.groupKeyTabsy+' to avail benefits. Download the TABSY app from https://play.google.com/store/apps/details?id=io.ionic.starter.tabsy ';
      this.msg = 'Get many grocery items on one click at your place. Sign up with my Referral code :'+this.referralCode+' to avail benefits. Download the '+this.cName+' app from https://tabserp.com/Home/DownloadApp';
    })

  }

  ngOnInit() {

    console.log('ionViewDidLoad InviteFriendsPage');


  }

  shareSheetShare() {
    this.socialSharing.shareViaWhatsApp(this.msg,
        "", " ").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });

    // this.socialSharing.share("Get the freshest fruits and vegetables at the best price. Sign up with my referral code 91428 and earn Rs. 50. Download the Camel Cart app from htps://goo.gl/EBzRoM",
    //   null, null);
  }

  sendSMS(){
    const options={
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    }
    this.smsVar.send('416123456', this.msg,
        options)
        .then(()=>{
          // alert("success");
        },()=>{
          alert("failed");
        });
  }

  sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
    });

    let email = {
      to: '',
      cc: '',
      bcc: '',
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Check out '+''+this.cName,
      body: this.msg,
      isHtml: true
    };

// Send a text message using default options
    this.emailComposer.open(email);
  }


}
