import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from '@ionic/angular';
import {UserService} from '../Providers/user/user.service';
import {UtilityService} from '../Providers/utility/utility.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public nameError: any;
  public userMobileError: any;
  public userEmailError: any;
  public userCityError: any;
  public userPincodeError: any;
  public userAddress1Error: any;
  public imgBoolen: any;
  editData = {
    name: '',
    userMobile: '',
    userEmail: '',
    address_line1: '',
    address_line2: '',
    city: '',
    pincode: '',
    ReferralCode: '',
    cContactPersonName: '',
    cContactPersonMobileNo: '',
    cContactPersonEMailID: '',
    cGSTNO: '',
    cPAN: '',
    cFoodLicNo: ''
  };
  cDetail = {cMobile: '', cEmail: '', cGST: '', cPan: '', cFood: ''};
  public cForm: any = false;
  public rememberFlag = 0;
  public cMobileError: any;
  public cEmailError: any;
  public cGSTError: any;
  public cPanError: any;
  public isEnabledM: any = false;
  public isEnabledE: any = false;
  public isEnabledG: any = false;
  public isEnabledP: any = false;
  public isEnabledF: any = false;
  public isEnabledBtn: any = false;


  public data: any;
  imageURI: any;
  imageFileName: any;

  public base64Image: string = '';
  public imageChange;
  public userId: any;
  public cID: any;
  public mobOrEmailTabsy: any ;
  public emailIDVisible: any = false;

  constructor(public navCtrl: NavController, public  storage: Storage,
              /*public  filePath: FilePath,*/ public utilityProvider: UtilityService,
              public  actshCtrl: ActionSheetController,
              public toastCtrl: ToastController, /*public navParams: NavParams,*/
              public userProvider: UserService, private alertCtrl: AlertController,
              public platform: Platform, public loadingCtrl: LoadingController) {

    console.log(this.base64Image);

    storage.get('userInfo').then((isLoginResult) => {
      this.editData.name = isLoginResult.Name;
      this.storage.get("mobOrEmailTabsy").then(res => {
        this.mobOrEmailTabsy = res;
        console.log("mobOrEmailTabsy---- " +  this.mobOrEmailTabsy);

        if(this.mobOrEmailTabsy == "EMAIL") {
          this.editData.userEmail = isLoginResult.UserId;
        } else {
          this.editData.userEmail = isLoginResult.Email;
        }
      });

      this.editData.userMobile = isLoginResult.MobileNo;
      this.editData.address_line1 = isLoginResult.Address1;
      this.editData.address_line2 = isLoginResult.Address2;
      this.editData.city = isLoginResult.City;
      this.editData.pincode = isLoginResult.Pincode;
      this.editData.ReferralCode = isLoginResult.ReferralCode;

      this.cID = isLoginResult.ID;
      this.editData.cContactPersonName = isLoginResult.ContactPersonName;
      this.editData.cContactPersonMobileNo = isLoginResult.ContactPersonMobileNo;
      this.editData.cContactPersonEMailID = isLoginResult.ContactPersonEMailID;
      this.editData.cGSTNO = isLoginResult.GSTNO;
      this.editData.cPAN = isLoginResult.PAN;
      this.editData.cFoodLicNo = isLoginResult.FoodLicNo;

      console.log('-CDetails--RS-' + this.cID);
      console.log('-CDetails--RS-' + this.editData.cContactPersonName);
      console.log('-CDetails--RS-' + this.editData.cContactPersonMobileNo);
      console.log('-CDetails--RS-' + this.editData.cContactPersonEMailID);
      console.log('-CDetails--RS-' + this.editData.cGSTNO);
      console.log('-CDetails--RS-' + this.editData.cPAN);
      console.log('-CDetails--RS-' + this.editData.cFoodLicNo);

      console.log('----' + JSON.stringify(isLoginResult));

    });

    storage.get('userID').then((isLoginResult) => {
      this.userId = isLoginResult;
      console.log(this.userId);
    });


 }

  ngOnInit() {

    console.log('ionViewDidLoad EditDeliveryAddressPage');
    this.storage.get("mobOrEmailTabsy").then(res => {
      this.mobOrEmailTabsy = res;
      console.log("mobOrEmailTabsy---- " +  this.mobOrEmailTabsy);

      if(this.mobOrEmailTabsy == "EMAIL") {
        this.emailIDVisible = true;
      } else {
        this.emailIDVisible = false;
      }
    });

    this.storage.get('ProfileImage').then((isLoginResult) => {
      this.base64Image = isLoginResult;
      console.log(this.base64Image);
      if (this.base64Image == null) {
        this.base64Image = 'assets/imgs/ic_sign_up.png';
        console.log(this.base64Image);
      }
    });


    console.log('ionViewDidLoad EditProfilePage');

  }


  btn_back() {
    this.navCtrl.navigateForward(['/home']);
    // this.backCtrl.enable(true);
  }


  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    /*toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });*/

    await toast.present();
  }

  async presentAlertForUpdate() {
    const alert = await this.alertCtrl.create({
      header: "Update Successfully",
      message: "Updated profile May be show after Re-Login.",
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Disagree');

          }
        }

      ]
    });
    await alert.present();
  }



  cDetails() {

    console.log("remember Me = " + this.rememberFlag);
    if (this.rememberFlag == 0) {
      console.log("Clicked");
      this.isEnabledM = true;
      this.isEnabledE = true;
      this.isEnabledG = true;
      this.isEnabledF = true;
      this.isEnabledP = true;
      this.isEnabledBtn = true;
      this.rememberFlag = 1;
    } else {
      console.log("UnClicked");
      this.isEnabledM = false;
      this.isEnabledE = false;
      this.isEnabledG = false;
      this.isEnabledF = false;
      this.isEnabledP = false;
      this.isEnabledBtn = false;
      this.rememberFlag = 0;
    }

  }

  async updateProfile() {
    var check = true;
    if (this.editData.name.length >= 2) {
      this.nameError = true;
    } else {
      this.nameError = false;
      check = false;
    }

    if (this.editData.pincode.length >= 2) {
      this.userPincodeError = true;
    } else {
      this.userPincodeError = false;
      check = false;
    }


    if (this.editData.address_line1.length >= 2) {
      this.userAddress1Error = true;
    } else {
      this.userAddress1Error = false;
      check = false;
    }
    if (this.isEnabledP == true && this.isEnabledG == true) {
      if (this.editData.cPAN.length >= 2 && this.editData.cPAN.length == 10) {
        this.cPanError = true;
      } else {
        this.cPanError = false;
        check = false;
      }
      if (this.editData.cGSTNO.length >= 2 && this.editData.cGSTNO.length == 15 || this.editData.cGSTNO.length == 0) {
        this.cGSTError = true;
      } else {
        this.cGSTError = false;
        check = false;
      }
    }



    if (check == true) {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.userProvider.getUpdateProfile(
          this.cID,
          this.userId,
          this.editData.name,
          this.editData.userMobile,
          this.editData.userEmail,
          this.editData.address_line1,
          this.editData.address_line2,
          this.editData.city,
          this.editData.pincode, this.imageChange,
          this.editData.cContactPersonName,
          this.editData.cContactPersonEMailID,
          this.editData.cContactPersonMobileNo,
          this.editData.cFoodLicNo,
          this.editData.cGSTNO,
          this.editData.cPAN,
      ).then(res => {
        this.data = res;
        if (this.data.ReturnMessage == 'User has been successfully updated.') {
          // this.imageApi = this.data.ImageUrl;
          if (this.data.ImageUrl != '') {
            this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
          }
          this.storage.set('userInfo', this.data);

          this.navCtrl.navigateForward(['/home']);
          this.presentAlertForUpdate();
          console.log(res);
          loading.dismiss();
        } else {
          console.log(this.data.ReturnMessage);
          this.presentToast(this.data.ReturnMessage);
          loading.dismiss();

        }
      });
    }

  }



}
