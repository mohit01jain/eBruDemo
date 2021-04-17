import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  Events,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  PopoverController,
  ToastController
} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {OrderService} from '../Providers/order/order.service';
import {UtilityService} from '../Providers/utility/utility.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {AddressService} from '../Providers/address/address.service';
import {UserService} from '../Providers/user/user.service';

@Component({
  selector: 'app-pincode-according-shipping-address',
  templateUrl: './pincode-according-shipping-address.page.html',
  styleUrls: ['./pincode-according-shipping-address.page.scss'],
})
export class PincodeAccordingShippingAddressPage implements OnInit {
  public data:any;
  public name:any;
  public designation:any;
  public address1:any;
  public address2:any;
  public address3:any;
  public city:any;
  public pincode:any;
  public contact_no:any;
  public alt_contact_no:any;
  public gstno:any;
  public distance:any;
  public emailId:any;
  public stateList:any;
  public stateCode:any;
  public stateDetail:any;
  public saveReturnMsg:any;
  public lat:any;
  public long:any;
  public locationNAme: any;
  public position: any;
  public location = {state: 'Rajsthan', district: 'Jaipur', city: 'Shushilpura'};
  public nameError: any;
  public contact_noError: any;
  public address1Error: any;
  public stateListError: any;
  public cityError: any;
  public pincodeError: any;
  public AcntId:any;

  newAddData = {name:'',contact_no:'',address1:'',city:'',pincode:''};
  list: any;
  myParameter: boolean;
  // //private fixedpincode: any;
  //
  // shippingAddress: any;
  // registerData = {
  //   groupKey: '',
  //   userPassword: '',
  //   name: '',
  //   userID: '',
  //   userMobile: '',
  //   userAltMobileNo: '',
  //   userAddress1: '',
  //   userAddress2: '',
  //   userCity: '',
  //   userPincode: '',
  //   userInviteCode: ''
  // };
  // public groupKeyTabsy: any;
  // public data: any;
  // public base64Image: string = '';
  // private userPincode: any;
  // private userPassword: any;
  // private userAltMobileNo: any;
  // private userID: any;
  // private name: any;
  // private userMobile: any;
  // private userInviteCode: any;
  // Address1: any;
  // Address2: any;
  // userCity:any;
  // private userAddress1old: string;
  // private userCityold: string;
  // private userAddress2old: string;
  // private otp: any="Please enter otp again";
  // private fsslicno: any;
  // private gstno: any;
  // private panno: any;
  // private AcntId: any;
  // public designation:any;
  // public address3:any;
  // public stateCode:any;
  // public stateListError: any;
  // public stateDetail:any;
  // public distance:any;
  // public emailId:any;
  // public saveReturnMsg:any;
  // private FieldCodeId: any;
  // public stateList:any;
  // list: any;
  // public location = {state: 'Rajsthan', district: 'Jaipur', city: 'Shushilpura'};
  private fsslicno: any;
  private panno: any;
  constructor(public navCtrl: NavController,
              public activatedRoute: ActivatedRoute,
              /*public navParams: NavParams,*/ public storage: Storage, public events: Events, public toastCtrl: ToastController, public alertCtrl: AlertController,
              public orderProvider: OrderService, public platform: Platform, public utilityProvider: UtilityService,
              public addressProvider: AddressService, public userProvider: UserService, public loadingCtrl: LoadingController,public modalController: ModalController) {

    this.name = this.activatedRoute.snapshot.paramMap.get("name");
    this.contact_no = this.activatedRoute.snapshot.paramMap.get("userMobile");
    this.alt_contact_no = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
    this.address1 = this.activatedRoute.snapshot.paramMap.get("userAddress1");
    this.address2 = this.activatedRoute.snapshot.paramMap.get("userAddress2");
    this.city = this.activatedRoute.snapshot.paramMap.get("userCity");
    this.fsslicno = this.activatedRoute.snapshot.paramMap.get("fsslicno");
    this.gstno = this.activatedRoute.snapshot.paramMap.get("gstno");
    this.panno = this.activatedRoute.snapshot.paramMap.get("panno");
    this.pincode = this.activatedRoute.snapshot.paramMap.get("userPincode");
    //this.userInviteCode = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
    // this.base64Image = this.activatedRoute.snapshot.paramMap.get("base64Image");
    this.AcntId = this.activatedRoute.snapshot.paramMap.get("AcntId");
    this.getState();
  }

  ngOnInit() {
  }

  getState(){
    this.addressProvider.getStateCode().then(res=>{
      this.stateList = res;
      console.log("State list = "+JSON.stringify(this.stateList));

    });
  }
  async SaveDetails() {

    var check1 = true;
    console.log("state code = " + this.stateCode);

    if (typeof this.stateCode != "undefined") {
      this.stateListError = true;
    } else {
      this.stateListError = false;
      check1 = false;
    }

    if (check1 == true && this.stateListError == true) {


      console.log("OK submit");

    this.addressProvider.savedAddress("00000000-0000-0000-0000-000000000000",
        this.AcntId,
        this.name, this.designation, this.address1,
        this.address2, this.address3,
        this.city, this.stateDetail.FieldCodeId, this.stateDetail.Text , this.stateDetail.FieldCode,
        this.pincode, this.contact_no,
        // this.addressProvider.savedAddress("00000000-0000-0000-0000-000000000000", this.data.AcntId,
        //   this.name, this.designation, this.address1, this.address2, this.address3,
        //   this.city, this.stateDetail,
        //   this.pincode, this.contact_no,
        this.alt_contact_no, this.gstno, this.distance, this.emailId, true).then(res => {
      this.saveReturnMsg = res;
      //console.log("Mohit AcntID =" +this.data.AcntId);

      console.log("----return msg----" + JSON.stringify(this.saveReturnMsg));
      if (this.saveReturnMsg.ReturnMessage == "Shipping Address successfully Created.") {

        //  this.navCtrl.pop();

           this.navCtrl.navigateRoot(['/home']);

      }
    })
    } else {
      await this.presentToast("Please enter all mandatory fields.")
    }

    // this.addressProvider.savedAddress("00000000-0000-0000-0000-000000000000",this.groupKeyTabsy, this.userID,
    //
    //       this.userPassword,
    //       this.name,
    //       this.userMobile,
    //       this.userAltMobileNo,
    //       this.userMobile,
    //       this.Address1,
    //       this.Address2,
    //       this.userCity,
    //       this.fsslicno,
    //       this.gstno,
    //       this.panno,
    //       this.userPincode,
    //       this.userInviteCode,
    //       this.base64Image).then(res => {
    //     this.data = res;
    //     if (this.data.ReturnMessage == 'User has been successfully created.') {
    //       // this.navCtrl.push(SingInPage);
    //       this.storage.set('userInfo', this.data);
    //       this.storage.set('userID', this.data.UserId);
    //       this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
    //       this.storage.set('groupKeyTabsy', this.registerData.groupKey);
    //       this.storage.set('username', this.registerData.userID);
    //       this.storage.set('password', this.registerData.userPassword);
    //       console.log(res);
    //
    //
    //     }
    //   });



    // await this.navCtrl.navigateRoot(['/register1',
    //   {
    //     "userID" :this.userID,
    //     "groupKeyTabsy":this.groupKeyTabsy,
    //     "userPassword":this.userPassword,
    //     "name":this.name,
    //     "userMobile":this.userMobile,
    //     "userAltMobileNo":this.userAltMobileNo,
    //     "userPincode":this.userPincode,
    //     "userInviteCode":this.userInviteCode,
    //     "base64Image": this.base64Image,
    //     "userAddress1": this.userAddress1old,
    //     "userAddress2": this.userAddress2old,
    //     "userCity"    : this.userCityold,
    //     "fsslicno"    : this.fsslicno,
    //     "gstno"       : this.gstno,
    //     "panno"       : this.panno,
    //     "mobOrEmailTabsy" : "EMAIL",
    //     "otp" : this.otp,
    //     "flagdialougebox" : "alreadydone",
    //     page: "register"
    //
    //   }]);

  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    /*  toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });*/
    await toast.present();
  }

  onChange(listIndex)
  {
    console.log("---list---"+JSON.stringify(this.stateList[listIndex]));
    this.stateDetail = this.stateList[listIndex];
    this.stateCode = this.stateList[listIndex].Value;
    console.log("--state code  = "+this.stateList[listIndex].Value);

  }
}
