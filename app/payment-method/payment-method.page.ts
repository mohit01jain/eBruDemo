import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController, Events, AlertController, Platform, PopoverController} from '@ionic/angular';
import {OrderService} from '../Providers/order/order.service';
import {Storage} from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import {UtilityService} from '../Providers/utility/utility.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {AddressService} from '../Providers/address/address.service';
import {UserService} from '../Providers/user/user.service';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  selectPaymentMethod: any;
  public allData: any;
  public addData: any = [];
  private shippingAddressDetail: any;
  public totalAmount: any;
  public deliveryCharge: any = 0;
  public totalPayableAmount: any;
  public overheadAmount: any = 0;
  public orderSuggestion: any = '';
  public toastReturn: any;
  public orderNo: any;
  public orderDate: any;
  private orderDescDSuggestion: any;
  public AcntId: any;
  public name: any;
  public address1: any;
  public address2: any;
  public colony: any;
  public city: any;
  public pincode: any;
  public contact_no: any;
  public myGroup: any;
  public companyName: any;
  public pageName: any;
  public selectedOrder: any;
  public selectedAddress: any;
  public visibility: any = false;
  public addressesList: any = [];
  public pg_hide: any;
  public pg_city_hide: any;
  public pg_pincode_hide: any;
  public pg_colony_hide: any;
  public pg_row_hide: any;
  public pg_alt_add_hide: any;
  public deliveryCharges: any;
  public userData: any;
  public defaultName: any;
  public defaultAdd1: any;
  public defaultAdd2: any;
  public defaultCity: any;
  public defaultPincode: any;
  public defaultMobileNo: any;
  public paymentMode:any;
  public paymentStatus:any;
  public paymentID:any;
  public ourPaymentID: any;

  constructor(public navCtrl: NavController,
              public activatedRoute: ActivatedRoute,
              /*public navParams: NavParams,*/ public storage: Storage, public events: Events, public toastCtrl: ToastController, public alertCtrl: AlertController,
              public orderProvider: OrderService, public platform: Platform, public utilityProvider: UtilityService, public datepipe: DatePipe,
              public decimalPipe: DecimalPipe, public  popoverController: PopoverController, public addressProvider: AddressService, public userProvider: UserService, public loadingCtrl: LoadingController) {

    this.orderDescDSuggestion = this.activatedRoute.snapshot.paramMap.get('orderSuggestion');
    console.log('orderDescDSuggestion name RS------ = ' + this.orderDescDSuggestion);

    this.utilityProvider.currentdateTime = this.datepipe.transform(this.utilityProvider.myDate, 'yyyy-MM-ddTHH:mm:ss');
    console.log('----latest date ---' + this.utilityProvider.currentdateTime);

    this.storage.get('AcntId').then(data => {
      this.AcntId = data;
    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      this.name = value.Name;
      this.address1 = value.Address1;
      this.address2 = value.Address2;
      this.colony = value.AreaName;
      this.city = value.City;
      this.pincode = value.AreaCode;
      this.contact_no = value.MobileNo;
      console.log('User DAta -----', JSON.stringify(this.allData));
      this.retrieveSavedAddress();
    });

    this.myGroup = new FormGroup({
      selectedItem: new FormControl()
    });

    this.storage.get('companyName').then(res => {
      this.companyName = res;
    });

    console.log('selected item = ' + this.myGroup.value.selectedItem);
    this.pageName = this.activatedRoute.snapshot.paramMap.get('page');


    if (this.pageName == 'pendingOrder') {
      this.selectedOrder = this.activatedRoute.snapshot.paramMap.get('searchOrderDetail');
      this.addData = this.selectedOrder.Items;
      console.log('selected order detail ------' + JSON.stringify(this.selectedOrder));
      this.totalAmount = this.activatedRoute.snapshot.paramMap.get('orderAmount');
      console.log('order amount = ' + this.totalAmount);
      this.overheadAmount = this.activatedRoute.snapshot.paramMap.get('overheadAmount');
      console.log('overhead amount = ' + this.overheadAmount);
      this.totalPayableAmount = this.activatedRoute.snapshot.paramMap.get('payableAmount');
      console.log('total payable amount = ' + this.totalPayableAmount);
      this.shippingAddressDetail = this.selectedOrder.ShippingAddress;
      console.log('order shipping address = ' + this.shippingAddressDetail);
      this.orderDescDSuggestion = this.selectedOrder.Description;
      if (this.selectedAddress != '') {
        this.visibility = true;
      }

    } else {
      this.totalAmount = this.activatedRoute.snapshot.paramMap.get('orderAmount');
      console.log('order amount = ' + this.totalAmount);
      this.overheadAmount = this.activatedRoute.snapshot.paramMap.get('overheadAmount');
      console.log('overhead amount = ' + this.overheadAmount);
      this.totalPayableAmount = this.activatedRoute.snapshot.paramMap.get('payableAmount');
      console.log('total payable amount = ' + this.totalPayableAmount);

      this.deliveryCharges = this.activatedRoute.snapshot.paramMap.get('deliveryChargesAmount');
      console.log('Delivery Charge amount = ' + this.deliveryCharges);

      this.storage.get('addData').then((list) => {
        this.addData = list;
        console.log('----addData---' + JSON.stringify(this.addData));
      });

    }
    this.storage.get('userInfo').then(userAddress => {
      this.userData = userAddress;
      console.log('user info name = ' + JSON.stringify(this.userData.Name));
      this.defaultName = this.userData.Name;
      console.log('user info address1 = ' + JSON.stringify(this.userData.Address1));
      this.defaultAdd1 = this.userData.Address1;
      console.log('user info address2 = ' + JSON.stringify(this.userData.Address2));
      this.defaultAdd2 = this.userData.Address2;
      console.log('user info city = ' + JSON.stringify(this.userData.City));
      this.defaultCity = this.userData.City;
      console.log('user info pincode = ' + JSON.stringify(this.userData.Pincode));
      this.defaultPincode = this.userData.Pincode;
      console.log('user info mobile no = ' + JSON.stringify(this.userData.MobileNo));
      this.defaultMobileNo = this.userData.MobileNo;

    });

    this.pg_hide = true;
    this.pg_city_hide = true;
    this.pg_pincode_hide = true;
    this.pg_colony_hide = true;
    // this.pg_alt_add_hide=true;
    this.pg_row_hide = true;

    if (this.address2 == null) {
      this.pg_hide = false;
      console.log('deeps');
    }
    if (this.colony == null) {
      this.pg_colony_hide = false;

    }
    if (this.city == null) {
      this.pg_city_hide = false;
    }
    if (this.pincode == null) {
      this.pg_pincode_hide = false;
    }
    if (this.city == null && this.pincode == null) {
      this.pg_row_hide = false;
    }


  }

  ngOnInit() {
  }

  selectedPaymentMethod(paymethod: string) {
    if (paymethod == "Cash on Delivery") {
      console.log("Cash on Delivery selected");
      this.selectPaymentMethod = "Cash on Delivery";
    
  }
    if(paymethod=="Card on Delivery"){
      console.log("Card on Delivery selected");
      this.selectPaymentMethod = "Card on Delivery";

    }
    else  {
      console.log("Pay Online");
      this.selectPaymentMethod = "Pay Online";
    }
  }

  async presetConfirm() {
    if (this.selectPaymentMethod == "Cash on Delivery") {
      this.ourPaymentID=null;
      this.paymentID=null;
      this.paymentMode=1;
      this.paymentStatus=1;
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.orderProvider.SetPlaceOrder("00000000-0000-0000-0000-000000000000", this.allData.UserId, this.allData.AcntId, this.addData, this.allData, this.shippingAddressDetail,
          this.totalAmount, this.deliveryCharge, this.totalPayableAmount, this.overheadAmount, 1, this.orderSuggestion,this.ourPaymentID,this.paymentID,this.paymentStatus,this.paymentMode).then((data) => {


        console.log("-----------RS----------" + JSON.stringify(data));

        this.toastReturn = data;
        console.log(data);
        this.orderNo = this.toastReturn.OrderNo;
        this.orderDate = this.toastReturn.OrderDate;

        console.log("-----order no-----" + this.orderNo + "-----order date-----" + this.orderDate);


        if (this.toastReturn.ReturnMessage == 'Successfully Saved.' || this.toastReturn.ReturnCode == 0) {
          // this.presentToast(this.toastReturn.ReturnMessage);

          let list = [];
          this.storage.set('addData', list);
          this.storage.set('itemnCount', 0);
          this.storage.set('totalProductAmount', 0);
          this.storage.set('totalAmount', 0);
          this.events.publish('totalAmount', 0);
          this.events.publish('ItemLength', 0);


          this.navCtrl.navigateRoot(['/order-successfull', {
            "orderNo": this.orderNo,
            "payableAmount": this.totalPayableAmount,
            "orderAmount": this.totalAmount,
            "orderSuggestion": this.orderSuggestion,
            "orderDate": this.orderDate,
            "ourPaymentID":this.ourPaymentID,
            "paymentID":this.paymentID,
            "paymentStatus":this.paymentStatus,
            "paymentMode":this.paymentMode,
            page: 'itemList'
          }]);
        } else if (this.toastReturn.ReturnCode == 11) {
          this.presentAlertForItem();
          this.toastReturn.Items[0].ItemPackagingList[0].ClosingStock = 2;

          this.storage.set('addData', this.toastReturn.Items);
          this.addData = this.toastReturn.Items;
          //this.navCtrl.setRoot(CartPage);
        }

        loading.dismiss();
      });

    }

    if (this.selectPaymentMethod == "Card on Delivery") {
      this.ourPaymentID=null;
      this.paymentID=null;
      this.paymentMode=3;
      this.paymentStatus=1;
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.orderProvider.SetPlaceOrder("00000000-0000-0000-0000-000000000000", this.allData.UserId, this.allData.AcntId, this.addData, this.allData, this.shippingAddressDetail,
          this.totalAmount, this.deliveryCharge, this.totalPayableAmount, this.overheadAmount, 1, this.orderSuggestion,this.ourPaymentID,this.paymentID,this.paymentStatus,this.paymentMode).then((data) => {


        console.log("-----------RS----------" + JSON.stringify(data));

        this.toastReturn = data;
        console.log(data);
        this.orderNo = this.toastReturn.OrderNo;
        this.orderDate = this.toastReturn.OrderDate;

        console.log("-----order no-----" + this.orderNo + "-----order date-----" + this.orderDate);


        if (this.toastReturn.ReturnMessage == 'Successfully Saved.' || this.toastReturn.ReturnCode == 0) {
          // this.presentToast(this.toastReturn.ReturnMessage);

          let list = [];
          this.storage.set('addData', list);
          this.storage.set('itemnCount', 0);
          this.storage.set('totalProductAmount', 0);
          this.storage.set('totalAmount', 0);
          this.events.publish('totalAmount', 0);
          this.events.publish('ItemLength', 0);


          this.navCtrl.navigateRoot(['/order-successfull', {
            "orderNo": this.orderNo,
            "payableAmount": this.totalPayableAmount,
            "orderAmount": this.totalAmount,
            "orderSuggestion": this.orderSuggestion,
            "orderDate": this.orderDate,
            "ourPaymentID":this.ourPaymentID,
            "paymentID":this.paymentID,
            "paymentStatus":this.paymentStatus,
            "paymentMode":this.paymentMode,
            page: 'itemList'
          }]);
        } else if (this.toastReturn.ReturnCode == 11) {
          this.presentAlertForItem();
          this.toastReturn.Items[0].ItemPackagingList[0].ClosingStock = 2;

          this.storage.set('addData', this.toastReturn.Items);
          this.addData = this.toastReturn.Items;
          //this.navCtrl.setRoot(CartPage);
        }

        loading.dismiss();
      });

    }

    else {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      await this.navCtrl.navigateForward(['/make-payment', {
        "payableAmount": this.totalPayableAmount,
        "orderSuggestion": this.orderSuggestion,
        "deliveryChargesAmount": this.deliveryCharge,
        "orderAmount": this.totalAmount,
        "overheadAmount": this.overheadAmount,
        page: "itemList"
      }]);
      loading.dismiss();
    }
  }

  async presentAlertForItem() {
    const alert = await this.alertCtrl.create({
      header: "Item Limit Exceeded!!",
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

  retrieveSavedAddress() {
    this.addressProvider.getSavedAddresses(this.allData.AcntId).then(res => {
      this.addressesList = res;
      console.log('Address list = ' + JSON.stringify(this.addressesList));
      if (this.pageName == 'itemList') {
        if (this.addressesList.length > 1) {
          this.selectedAddress = this.addressesList[1].ShippingId;
          this.shippingAddressDetail = this.addressesList[1];
          this.visibility = true;
        }

      } else {
        if (this.selectedAddress == 'ee76114e-0bc5-4da5-a4f5-c57ce721ba2e') {
          console.log('sdgjhshshfh');
          this.selectedAddress = this.addressesList[1].ShippingId;
        } else {
          this.selectedAddress = this.selectedOrder.ShippingAddress.ShippingId;
          console.log('selected address = ' + this.selectedAddress);
        }
      }

    });
  }
}
