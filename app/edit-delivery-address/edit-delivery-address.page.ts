import {Component, OnInit } from '@angular/core';
import {ModalController, NavParams, Platform, PopoverController} from '@ionic/angular';
import {AddressService} from '../Providers/address/address.service';
/*
import {ViewController} from 'ionic-angular';
*/
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-delivery-address',
  templateUrl: './edit-delivery-address.page.html',
  styleUrls: ['./edit-delivery-address.page.scss'],
})
export class EditDeliveryAddressPage implements OnInit {

  public data:any;
  public name:any;
  public address1:any;
  public address2:any;
  public city:any;
  public pincode:any;
  public contact_no:any;
  public shippingId:any;
  public saveReturnMsg:any;
  public index:any;
  public designation:any;
  public address3:any;
  public alt_contact_no:any;
  public gstno:any;
  public distance:any;
  public emailId:any;
  public stateList:any;
  public stateCode:any;
  public stateDetail:any;
  public list:any;

  constructor(public platform: Platform,
              public navparam : NavParams,
              public modalCtrl:ModalController,
             /* public viewCtrl:ViewController ,*/
              public addressProvider: AddressService,
              public activatedRoute:ActivatedRoute,
              public popupctrl:PopoverController
              ) {



    this.data = this.navparam.get('selectedData');
    console.log("selected data-----"+this.data);
    this.index = this.activatedRoute.snapshot.paramMap.get('index');
    console.log("index = " + this.index);


    //
     this.name = this.data.ContactPerson;
     this.designation = this.data.Dig;
     this.address1 = this.data.Add1;
     this.address2 = this.data.Add2;
     this.address3 = this.data.Add3;
     this.alt_contact_no = this.data.AlternateNumber;
     this.city = this.data.City;
     this.pincode = this.data.Zip;
     this.contact_no = this.data.MobileNo;
     this.gstno = this.data.GSTNO;
     this.distance = this.data.Distance;
     this.emailId = this.data.EmailId;
     this.shippingId = this.data.ShippingId;




    console.log("----data----" + JSON.stringify(this.data));
    console.log("--shipping id ----" + this.shippingId);
    this.getState();

  }
  ngOnInit() {
    console.log('ionViewDidLoad EditDeliveryAddressPage');
  }

  submitData() {
    console.log("OK submit");
    console.log("state detail = "+JSON.stringify(this.stateDetail));
    this.addressProvider.savedAddress(this.shippingId,this.data.AccountId,
                                      this.name,this.designation,this.address1,
                                      this.address2,this.address3,
                                      this.city,this.stateDetail.FieldCodeId,
                                      this.stateDetail.Text, this.stateDetail.FieldCode,
                                      this.pincode,this.contact_no,
                                      this.alt_contact_no,this.gstno,
                                      this.distance,this.emailId,
                              true).then(res=>{
      this.saveReturnMsg = res;
      console.log("----return msg----"+JSON.stringify(this.saveReturnMsg));
       this.popupctrl.dismiss();
    });

  }

  public async popupcancel() {
    /*const modal = await this.modalCtrl.getTop();
    await modal.dismiss();*/
    await this.popupctrl.dismiss();
  }

  getState() {
    this.addressProvider.getStateCode().then(res => {
      this.stateList = res;
      console.log("State list = " + this.stateList);
      for (var i=0;i<this.stateList.length;i++){
        if (this.data.State == this.stateList[i].FieldCodeId) {
          this.list = this.stateList[i];
          console.log("already selected state = "+JSON.stringify(this.list));
        }
      }
    });
  }

  onChange(list) {
    console.log("---list---" + JSON.stringify(list));
    this.stateDetail = list;
    this.stateCode = list.FieldCodeId;
    console.log("--state code  = " + this.stateCode);
  }




}
