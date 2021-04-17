import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {UserService} from '../Providers/user/user.service';
import {AlertController, LoadingController, NavController, Platform, PopoverController, ToastController} from '@ionic/angular';
import {UtilityService} from '../Providers/utility/utility.service';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
})
export class Register1Page implements OnInit {
  public type = 'password';
  public a: any;
  public a1: any;
  private otp1: string;
  registerData = {

    groupKey: '',
    userPassword: '',
    name: '',
    userID: '',
    userMobile: '',
    userAltMobileNo: '',
    userAddress1: '',
    userAddress2: '',
    userCity: '',
    userPincode:'',
    userInviteCode: '',
    fsslicno: '',
    gstno: '',
    panno: '',

    groupKey1: '',
    userPassword1: '',
    name1: '',
    userID1: '',
    userMobile1: '',
    userAltMobileNo1: '',
    userAddress11: '',
    userAddress21: '',
    userCity1: '',
    userPincode1:'',
    userInviteCode1: '',
    fsslicno1: '',
    gstno1: '',
    panno1: '',

  };
  public groupKeyTabsy: any;
  public groupKeyTabsy1: any;
  public mobOrEmailTabsy: any;
  public emailIDVisible: any = false;
  private base64Image: string = '';
  private base64Image1: string = '';
  private flagdialougebox: any;
  private visiblity: any;
  visible: any;
  selectBranch: any;
  branchList: any;
  public nameError: any;
  public add1Error: any;
  public add2Error: any;
  public cityError: any;
  public emailIdError: any;
  public userPincodeError: any;
  public userMobileError: any;
  public userAltMobileError: any;
  public fssError: any;
  public gstError: any;
  public panError: any;
  userPasswordError: any;
  public showPass = false;
  private data: any;
  constructor(
      public storage: Storage,
      public userProvider: UserService,
      public navCtrl: NavController,
      public utilityProvider: UtilityService,
      public platform: Platform,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public appVersion: AppVersion,
      public popoverCtrl: PopoverController,
      public activatedRoute: ActivatedRoute,
  ) {

    this.a = this.activatedRoute.snapshot.paramMap.get("userID");
    if (this.a != null) {
      this.registerData.userID1 = this.activatedRoute.snapshot.paramMap.get("userID");
    }


    this.a = this.activatedRoute.snapshot.paramMap.get("groupKeyTabsy");
    if (this.a != null) {

      this.groupKeyTabsy = this.activatedRoute.snapshot.paramMap.get("groupKeyTabsy");
      console.log("Grp Key tabsy = " +this.groupKeyTabsy);
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userPassword");
    if (this.a != null) {


      this.registerData.userPassword1 = this.activatedRoute.snapshot.paramMap.get("userPassword");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("name");
    if (this.a != null) {
      this.registerData.name1 = this.activatedRoute.snapshot.paramMap.get("name");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userMobile");
    if (this.a != null) {
      this.registerData.userMobile1 = this.activatedRoute.snapshot.paramMap.get("userMobile");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
    if (this.a != null) {
      this.registerData.userAltMobileNo1 = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userPincode");
    if (this.a != null) {
      this.registerData.userPincode1 = this.activatedRoute.snapshot.paramMap.get("userPincode");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
    if (this.a != null) {
      this.registerData.userInviteCode1 = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("base64Image");
    if (this.a != null) {
      this.base64Image1 = this.activatedRoute.snapshot.paramMap.get("base64Image");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("userAddress1");
    if (this.a != null) {
      this.registerData.userAddress11 = this.activatedRoute.snapshot.paramMap.get("userAddress1");
    }
    this.a = this.activatedRoute.snapshot.paramMap.get("userAddress2");
    if (this.a != null) {
      this.registerData.userAddress21 = this.activatedRoute.snapshot.paramMap.get("userAddress2");
    }
    this.a = this.activatedRoute.snapshot.paramMap.get("userCity");
    if (this.a != null) {
      this.registerData.userCity1 = this.activatedRoute.snapshot.paramMap.get("userCity");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("fsslicno");
    if (this.a != null) {
      this.registerData.fsslicno1 = this.activatedRoute.snapshot.paramMap.get("fsslicno");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("gstno");
    if (this.a != null) {
      this.registerData.gstno1 = this.activatedRoute.snapshot.paramMap.get("gstno");
    }

    this.a = this.activatedRoute.snapshot.paramMap.get("panno");
    if (this.a != null) {
      this.registerData.gstno1 = this.activatedRoute.snapshot.paramMap.get("panno");
    }

    this.a1 = this.activatedRoute.snapshot.paramMap.get("mobOrEmailTabsy");
    if (this.a1 != null) {
      this.mobOrEmailTabsy = this.activatedRoute.snapshot.paramMap.get("mobOrEmailTabsy");
      console.log("moborEmailTabsy = " + this.mobOrEmailTabsy);
    }

    this.a1 = this.activatedRoute.snapshot.paramMap.get("otp");
    if (this.a1 != null) {
      this.otp1 = this.activatedRoute.snapshot.paramMap.get("otp");
      console.log("moborEmailTabsy = " + this.mobOrEmailTabsy);
    }

    this.a1 = this.activatedRoute.snapshot.paramMap.get("flagdialougebox");
    if (this.a1 != null) {
      this.flagdialougebox = this.activatedRoute.snapshot.paramMap.get("flagdialougebox");

    }


    if (this.a == null) {

      this.storage.get('groupKeyTabsy').then(res => {
        this.groupKeyTabsy = res;
        console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

      });
    }

    if (this.a != null) {
      {
        if (this.mobOrEmailTabsy == 'EMAIL') {
          this.emailIDVisible = true;
          this.visiblity=true;
        } else {
          this.emailIDVisible = false;

        }
      }

    }



  }
  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  async userRegisterEmail() {


    var check1 = true;

    if (this.registerData.userID.length >= 2) {
      this.emailIdError = true;
    } else {
      this.emailIdError = false;
      check1 = false;
    }
    if (this.registerData.userPassword.length >= 3) {
      this.userPasswordError = true;
    } else {
      this.userPasswordError = false;
      check1 = false;
    }
    if (this.registerData.name.length >= 2) {
      this.nameError = true;
    } else {
      this.nameError = false;
      check1 = false;
    }

    if (this.registerData.userAddress1.length >= 2) {
      this.add1Error = true;
    } else {
      this.add1Error = false;
      check1 = false;
    }

    if (this.registerData.userCity.length >= 2) {
      this.cityError = true;
    } else {
      this.cityError = false;
      check1 = false;
    }

    if (this.registerData.userPincode.length >= 2) {

      this.userPincodeError = true;

      // for (var i = 0; i < this.PincodePopoverPage.length; i++) {
      //   if (this.registerData.userPincode == this.PincodePopoverPage[i]) {
      //
      //     this.flagregister = 1;
      //     //return;
      //   }
      // }
      //
      // if (this.flagregister == 0) {
      //
      //   const alert = await this.alertCtrl.create({
      //     header: 'Selection',
      //     message: 'Currently this PIN Code area is not under our service area :  ',
      //     inputs:[],
      //
      //     buttons: [
      //       {
      //         text: 'Do you want to change the above address',
      //         role: 'cancel',
      //         handler: async () => {
      //           console.log('Cancel clicked');
      //
      //         }
      //       },
      //       {
      //         text: 'You will pick all deliveries from store',
      //         role: 'cancel',
      //         handler: () => {
      //           console.log('Change shipping address clicked');
      //
      //
      //         }
      //       },
      //
      //       {
      //         text: 'Show me the list of serviced PIN codes',
      //         handler: () => {
      //           console.log('Change shipping address clicked');
      //
      //           this.navCtrl.navigateRoot(['/popover-pagefor-pincode', {
      //             "userPincode": this.registerData.userPincode,
      //             /*"groupKeyTabsy": this.groupKeyTabsy,*/
      //             "userID": this.registerData.userID,
      //             "userPassword": this.registerData.userPassword,
      //             "name": this.registerData.name,
      //             "userMobile": this.registerData.userMobile,
      //             "userAltMobileNo": this.registerData.userAltMobileNo,
      //             "userAddress1": this.registerData.userAddress1,
      //             "userAddress2": this.registerData.userAddress2,
      //             "userCity": this.registerData.userCity,
      //             "fsslicno": this.registerData.fsslicno,
      //             "gstno": this.registerData.gstno,
      //             "panno": this.registerData.panno,
      //             "userInviteCode": this.registerData.userInviteCode,
      //             "base64Image": this.base64Image,
      //
      //
      //           }]);
      //
      //
      //         }
      //       },
      //
      //       {
      //         text: 'Quit',
      //         handler: () => {
      //           console.log('Quit');
      //           this.navCtrl.navigateRoot(['/popover-pagefor-pincode']);
      //
      //
      //
      //         }
      //       }
      //     ],
      //
      //
      //   });
      //   await alert.present();
      // }
    }
    else {
      this.userPincodeError = false;
      check1 = false;
    }

    // console.log('userOtpError = ' + this.userOtpError);


    // if (this.userOtpError == true && typeof this.userOtpError != 'undefined') {
    //   const loading = await this.loadingCtrl.create({
    //     message: 'Please wait...'
    //   });
    //
    //   await loading.present();
      this.storage.get('groupKeyTabsy').then(res => {
        this.groupKeyTabsy = res;
        console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

        this.userProvider.getRegister(this.groupKeyTabsy, this.registerData.userID,
            this.registerData.userPassword,
            this.registerData.name,
            this.registerData.userMobile,
            this.registerData.userAltMobileNo,
            this.registerData.userMobile,
            this.registerData.userAddress1,
            this.registerData.userAddress2,
            this.registerData.userCity,
            this.registerData.fsslicno,
            this.registerData.gstno,
            this.registerData.panno,
            this.registerData.userPincode,
            this.registerData.userInviteCode,
            this.base64Image).then(res => {
          this.data = res;
          // if (this.data.ReturnMessage == 'User has been successfully created.') {
            // this.navCtrl.push(SingInPage);
            this.storage.set('userInfo', this.data);
            this.storage.set('userID', this.data.UserId);
            this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
            this.storage.set('groupKeyTabsy', this.registerData.groupKey);
            this.storage.set('username', this.registerData.userID);
            this.storage.set('password', this.registerData.userPassword);
            console.log(res);

            this.navCtrl.navigateRoot(['/home']).then(() => {
              // const index = this.viewCtrl.index;
              // this.navCtrl.remove(index);
              // loading.dismiss();
            });
          // } else {
          //  // loading.dismiss();
          //   console.log(this.data.ReturnMessage);
          //   if (this.data.ReturnMessage == 'Invalid object name \'PromoCode\'.' && this.userOtpError == true) {
          //     this.presentToast(this.data.ReturnMessage);
          //   } else {
          //     this.userOtpError = false;
          //     this.presentToast(this.data.ReturnMessage);
          //   }
          //
          //
          // }
        });
      });


    // } else {
    //   this.presentToast('Please enter CODE received on your registered EmailID.');
    // }
  }
  ngOnInit() {
  }

}
