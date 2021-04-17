import { Component, OnInit } from '@angular/core';
import {Events, /*LoadingController,*/ ModalController, NavController, Platform, PopoverController, ToastController} from '@ionic/angular';
import {AddressService} from '../Providers/address/address.service';
import {ActivatedRoute} from '@angular/router';
import {success} from 'ionic/lib/color';
import { Components } from '@ionic/core';
import {ModalPage} from '../modal/modal.page';


@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

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


  constructor(public navCtrl: NavController ,
              public addressProvider:AddressService,
              public platform: Platform ,
              public event:Events,
              public activatedRoute : ActivatedRoute,
              public toastCtrl:ToastController,
              /* public popCtrl:PopoverController,*/
              public modalController: ModalController) {


    this.data=this.activatedRoute.snapshot.paramMap.get('data');
    console.log("----data-------RV---"+JSON.stringify(this.data));
    this.getState();

  }

  ngOnInit() {
    console.log('ionViewDidLoad NewAddressPage');

    /*
        await this.popupcancel();
    */
  }

  getState(){
    this.addressProvider.getStateCode().then(res=>{
      this.stateList = res;
      console.log("State list = "+JSON.stringify(this.stateList));

    });
  }
  async submitData() {

    var check1 = true;

    if (this.newAddData.name.length >= 2) {
      this.nameError = true;
    } else {
      this.nameError = false;
      check1 = false;
    }

    if (this.newAddData.contact_no.length >= 2) {
      this.contact_noError = true;
    } else {
      this.contact_noError = false;
      check1 = false;
    }

    if (this.newAddData.address1.length >= 2) {
      this.address1Error = true;
    } else {
      this.address1Error = false;
      check1 = false;
    }

    console.log("state code = " + this.stateCode);

    if (typeof this.stateCode != "undefined") {
      this.stateListError = true;
    } else {
      this.stateListError = false;
      check1 = false;
    }

    if (this.newAddData.city.length >= 2) {
      this.cityError = true;
    } else {
      this.cityError = false;
      check1 = false;
    }

    if (this.newAddData.pincode.length >= 2) {
      this.pincodeError = true;
    } else {
      this.pincodeError = false;
      check1 = false;
    }

    if (check1 == true && this.stateListError == true) {
      //   // let loading = this.loadingCtrl.create({
      //   //   content: 'Please wait...'
      //   // });

      console.log("OK submit");

      this.addressProvider.savedAddress("00000000-0000-0000-0000-000000000000",
          this.data.AcntId,
          this.newAddData.name, this.designation, this.newAddData.address1,
          this.address2, this.address3,
          this.newAddData.city, this.stateDetail.FieldCodeId, this.stateDetail.Text, this.stateDetail.FieldCode,
          this.newAddData.pincode, this.newAddData.contact_no,
          // this.addressProvider.savedAddress("00000000-0000-0000-0000-000000000000", this.data.AcntId,
          //   this.name, this.designation, this.address1, this.address2, this.address3,
          //   this.city, this.stateDetail,
          //   this.pincode, this.contact_no,
          this.alt_contact_no, this.gstno, this.distance, this.emailId, true).then(res => {
        this.saveReturnMsg = res;
        console.log("Mohit AcntID =" +this.data.AcntId);

        console.log("----return msg----" + JSON.stringify(this.saveReturnMsg));
        if (this.saveReturnMsg.ReturnMessage == "Shipping Address successfully Created.") {

        //  this.navCtrl.pop();
            this.modalController.dismiss();
       //   this.navCtrl.navigateRoot(['/delivery-address']);

        }
      })
    } else {
      await this.presentToast("Please enter all mandatory fields.")
    }


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

  async popupcancel() {
    /*
        const  list = new this.list();
    */
    /*  @Input() modal: Components.IonModal;*/

    /*
        onCancel = () =>
    */
    /* await this.modalCtrl.dismiss('cancel');*/


    /*     const modal = await this.modalController.create({
           component: ModalPage
         });

         await modal.present();*/

    await this.modalController.dismiss();



  }


}
