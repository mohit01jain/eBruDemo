import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, /*NavController,*/ NavParams, PopoverController, ToastController} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {UserService} from '../Providers/user/user.service';
import {IonicPage, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'app-partial-update',
  templateUrl: './partial-update.page.html',
  styleUrls: ['./partial-update.page.scss'],
})
export class PartialUpdatePage implements OnInit {

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
  public cForm: any = false;
  public rememberFlag = 0;
  public cMobileError: any;
  public cEmailError: any;
  public cGSTError: any;
  public cPanError: any;
  public dataPU: any;
  public userId: any;
  public cID: any;
  success: boolean;

  constructor(/*public navCtrl: NavController,*/ public toastCtrl: ToastController,
              public userProvider: UserService, public loadingCtrl: LoadingController,
              public popctrl: PopoverController,
             /* public navParams: NavParams,*/ public  storage: Storage, public modalCtrl: ModalController) {

  storage.get('userInfo').then((isLoginResult) => {
  this.editData.name = isLoginResult.Name;
  this.editData.userEmail = isLoginResult.Email;
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
    console.log('ionViewDidLoad PartialUpdatePage');

  }

  async updateCommercial() {

    var check = true;
    if (this.editData.cPAN.length >= 2 && this.editData.cPAN.length == 10) {
      this.cPanError = true;
    } else {
      this.cPanError = false;
      check = false;
    }
    if (this.editData.cGSTNO.length >= 2 && this.editData.cGSTNO.length == 15 || this.editData.cGSTNO.length == 0 ) {
      this.cGSTError = true;
    } else {
      this.cGSTError = false;
      check = false;
    }
    if (check == true) {
      const loading =  await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.userProvider.getPartialUpdate(
          this.cID,
          this.userId,
          this.editData.name,
          this.editData.userMobile,
          this.editData.userEmail,
          this.editData.address_line1,
          this.editData.address_line2,
          this.editData.city,
          this.editData.pincode, '',
          this.editData.cContactPersonName,
          this.editData.cContactPersonEMailID,
          this.editData.cContactPersonMobileNo,
          this.editData.cFoodLicNo,
          this.editData.cGSTNO,
          this.editData.cPAN,
      ).then(res => {
        this.dataPU = res;
        if (this.dataPU.ReturnMessage == 'User has been successfully updated.') {
          // this.imageApi = this.data.ImageUrl;
          // if (this.dataPU.ImageUrl != '') {
          //   this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
          // }
          this.storage.set('userInfo', this.dataPU);
          // this.navCtrl.push(CartPage);
          this.popctrl.dismiss();
          console.log(res);
          loading.dismiss();
        } else {
          console.log(this.dataPU.ReturnMessage);
          this.presentToast(this.dataPU.ReturnMessage);
          loading.dismiss();

        }
      });
      this.presentToast('Successfully Save');
    }
    // }else
    //   {
    //     this.presentToast('Please Fill Valid Inputs');
    //   }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    /*await this.modalCtrl.onDidDismiss(() => {
      console.log('Dismissed toast');
    })*/

    await toast.present();
  }

  async submitData(success:boolean) {
    console.log("OK submit");
    await this.popctrl.dismiss(success);

  }

}
