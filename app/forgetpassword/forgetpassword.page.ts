import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from '@ionic/angular';
import {User} from 'ionic';
import {UserService} from '../Providers/user/user.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

  private smsData: any;

  public userOtpError: any;
  public userNPError: any;
  public userCNPError: any;
  public userOTP: any;
  public randomNo: any;
  public smsText: any;
  public showPass = false;
  public type = 'password';
  public showCPass = false;
  public typeC = 'password';
  public enterOTP: any;
  public addDataList: any = [];
  public username: any;
  public usernamefg: any;
  public password: any;
  public visiblity: any = false;
  public visiblityNP: any = false;

  public visiblitySendOTP: any = true;
  public isEnabledd: any = true;
  public isEnableddSend: any = true;
  public isEnableddSendCode: any = true;
  public isEnableddMob: any = true;

  UpdateData = {userPassword: '', userConfirm: ''};

  public getupdatePasswordData: any = [];
  public userPassword: any;
  isenabled: boolean = false;
  public isEnabled: any = false;
  public oldrandomNo: any;
  public visiblityOTPRow: any = true;
  public visiblityOTPTime: any = true;
  public maxtime: any = 3;
  public groupKey: any  ;
  private timer: any;
  public emailIDVisible: any = false;
  public validateMobOrEmail: any;
  public validateGroupKeyData: any=[];
  public mobOrEmailTabsy: any ;
  public groupKeyTabsy: any ;
  userMobileError: boolean;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public storage: Storage,
              /*public navParams: NavParams,*/ public userProvider: UserService,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log("ForgetpasswordPage" );

    this.storage.get("groupKeyTabsy").then(res => {
      console.log("already stored GroupKey = " + res);
      if (res == null) {
        this.groupKey = "";
      } else {
        this.groupKey = res;
      }
    });
    this.storage.get("username").then(res => {
      console.log("already stored username = " + res);
      if (res == null) {
        this.usernamefg = "";
      } else {
        this.usernamefg = res;
      }
    });


  }

  ngOnInit() {

    console.log('ionViewDidLoad ForgetpasswordPage');

    // if(this.usernamefg==null)
    // {
    //   this.presentToast("Please Enter Mobile No. & Enter Last password that you remembered");
    //
    // }
    this.storage.get("mobOrEmailTabsy").then(res => {
      this.mobOrEmailTabsy = res;
      console.log("mobOrEmailTabsy---- " +  this.mobOrEmailTabsy);

      if(this.mobOrEmailTabsy == "EMAIL") {
        this.emailIDVisible = true;
      } else {
        this.emailIDVisible = false;
      }
    });
    console.log(" 1234");

  }


  checkForSendOTP()
  {
    if(this.usernamefg.length==10) {
      this.isEnableddSend = true;
    }else
    {
      this.isEnableddSend = false;

    }
  }






  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    /* toast.onDidDismiss(() => {
       console.log('Dismissed toast');
     });*/

    await toast.present();
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }


  checkForOTP() {
    if (this.userOTP == this.enterOTP) {
      this.visiblityOTPRow = false;
      this.userOtpError = true;
      this.visiblityNP = true;
      this.isEnabled = true;
      this.visiblityOTPTime = false;

      // this.isEnabledd = false;

    } else {
      this.visiblityOTPRow = true;
      this.userOtpError = false;
      this.visiblityNP = false;
      this.isEnabled = false;
      this.visiblityOTPTime = true;

      // this.isEnabledd = true;

    }
  }


  async updatePassword() {
    let check = true;

    if (this.UpdateData.userPassword.length >= 3) {
      this.userNPError = true;
    } else {
      this.userNPError = false;
      check = false;
    }
    if (this.UpdateData.userConfirm.length >= 3) {
      this.userCNPError = true;
    } else {
      this.userCNPError = false;
      check = false;
    }

    if (check == true && this.UpdateData.userPassword == this.UpdateData.userConfirm) {
      let loading =await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.storage.get("groupKeyTabsy").then(res => {
        this.groupKeyTabsy = res;
        console.log("groupKeyTabsy---- " + this.groupKeyTabsy);
        this.userProvider.updatePassword(this.groupKeyTabsy, this.usernamefg, this.UpdateData.userPassword).then(res => {
          this.getupdatePasswordData = res;
          console.log("Retrieve getupdatePasswordData List----RS---- " + JSON.stringify(this.getupdatePasswordData));
          this.navCtrl.pop();
           loading.dismiss();
        });
      });
    } else {
      console.log("both are not same----RS---- ");
      this.presentToast('Enter Same Password And Confirm Password');

    }
  }

  updatePasswordCancel() {
    this.navCtrl.navigateRoot(['/sign-in']);
  }




  async sendOTP() {
    this.visiblitySendOTP = false;
    this.isEnabledd = false;
    this.isEnableddMob = false;

    var timeLeft = 30;
    var elem = document.getElementById('some_div');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        document.getElementById('some_div').style.display = 'none';
      } else {

        elem.innerHTML = '(' + timeLeft + ') Seconds Remaining';
        timeLeft--;


      }
    }

    let massage = () => {
      console.log('greetings from timeout');

      this.isEnabledd = true;

    };

    setTimeout(massage, 30000);

    this.randomNo = Math.floor(1000 + Math.random() * 9000);
    console.log(this.randomNo);
    this.oldrandomNo = this.randomNo;
    this.storage.set('oldRandomNo', this.oldrandomNo);

    this.smsText = "Your OTP for Mobile Verification is " + this.randomNo;
    console.log(this.smsText);

    await this.presentToast("OTP sent successfully to your entered Mobile No.");

    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " + this.groupKeyTabsy);
      this.userProvider.apiSendSmS(this.groupKeyTabsy, this.usernamefg, this.smsText).then(res => {
        this.smsData = res;
        if (this.smsData.Status == 1) {
          this.visiblity = true;

          console.log(" OTP Message ----RS---- " + this.randomNo);
          this.enterOTP = this.randomNo;
          console.log(" OTP  ----RS---- " + this.enterOTP);


          this.visiblity = true;


        } else {
          console.log(" OTP not Sent ----RS---- ");

        }

        console.log(" Retrieve api SendSmS DATA ----RS---- " + JSON.stringify(this.smsData));
      });
    });
  }
  async resendOTP() {


    this.isEnabledd = false;
    var timeLeft = 30;
    var elem = document.getElementById('some_div');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        document.getElementById('some_div').style.display = 'none';
      } else {
        document.getElementById('some_div').style.display = 'block';

        elem.innerHTML = '(' + timeLeft + ') Seconds Remaining';
        timeLeft--;


      }
    }

    let massage = () => {
      console.log('greetings from timeout');

      this.isEnabledd = true;

    };

    setTimeout(massage, 30000);
    this.storage.get("oldRandomNo").then(res => {
      this.oldrandomNo = res;
    });
    this.smsText = "Your OTP for Mobile Verification is " + this.oldrandomNo;
    console.log(this.smsText);

    await this.presentToast("OTP sent successfully to your entered Mobile No.");
    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " + this.groupKeyTabsy);
      this.userProvider.apiSendSmS(this.groupKeyTabsy, this.usernamefg, this.smsText).then(res => {
        this.smsData = res;
        if (this.smsData.Status == 1) {

          console.log(" OTP Message ----RS---- " + this.randomNo);
          this.enterOTP = this.randomNo;
          console.log(" OTP  ----RS---- " + this.enterOTP);

        } else {
          console.log(" OTP not Sent ----RS---- ");

        }

        console.log(" Retrieve api SendSmS DATA ----RS---- " + JSON.stringify(this.smsData));
      });
    });
  }

  async sendCode() {
    this.isEnableddSendCode = false;
    this.isEnabledd = false;
    this.isEnableddMob = false;

    let timeLeft = 30;
    let elem = document.getElementById('some_div2');

    let timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        document.getElementById('some_div2').style.display = 'none';
      } else {

        elem.innerHTML = '(' + timeLeft + ') Seconds Remaining';
        timeLeft--;


      }
    }

    let massage = () => {
      console.log('greetings from timeout');
      this.isEnableddSendCode = true;


    };

    setTimeout(massage, 30000);

    this.randomNo = Math.floor(1000 + Math.random() * 9000);
    console.log(this.randomNo);
    this.oldrandomNo = this.randomNo;
    this.storage.set('oldRandomNo', this.oldrandomNo);

    this.smsText = "Your Verification CODE is " + this.randomNo;
    console.log(this.smsText);

    await this.presentToast("OTP sent successfully to your entered Mail ID.");

    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " + this.groupKeyTabsy);
      this.userProvider.CustomerRequest_SendEmailForCode(this.groupKeyTabsy, this.usernamefg, this.smsText).then(res => {
        this.smsData = res;
        if (this.smsData.Status == 1) {
          this.visiblity = true;

          console.log(" OTP Message ----RS---- " + this.randomNo);
          this.enterOTP = this.randomNo;
          console.log(" OTP  ----RS---- " + this.enterOTP);


          this.visiblity = true;


        } else {
          console.log(" OTP not Sent ----RS---- ");

        }

        console.log(" Retrieve api SendSmS DATA ----RS---- " + JSON.stringify(this.smsData));
      });
    });
  }

}
