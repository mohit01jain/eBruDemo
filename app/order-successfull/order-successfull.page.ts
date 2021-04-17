import { Component, OnInit } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NavController, Platform} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {UserService} from '../Providers/user/user.service';
import {ActivatedRoute} from '@angular/router';


@IonicPage()
@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.page.html',
  styleUrls: ['./order-successfull.page.scss'],
})
export class OrderSuccessfullPage implements OnInit {

  public orderNo: any;
  public orderDate: any;
  public orderData: any;
  public pageName: any;
  public compData: any;
  public orderSuggestion: any;
  public smsData: any;
  public smsData2: any;
  public cPhone1: any;
  public userPhone: any;
  public userPhoneForMag: any;
  public smsConfirm: any;
  public smsConfirmCr: any;
  public smsConfirm2: any;
  public totalPayableAmount: any;
  public totalAmount: any;
  public totalPayableAmountmsg: any;
  public totalPayableAmountForDel: any;
  public totalPayableAmountForMsg: any;
  public groupKey: any  ;
  public groupKeyTabsy: any  ;
  public mobOrEmailTabsy: any ;
  public CreditLimit: any;
  public remCreditLimit: any;
  public st_Flag: any = false;
  public paymentMode:any;
  public paymentStatus:any;
  public paymentID:any;
  public ourPaymentID: any;

  constructor(public navCtrl: NavController, public storage: Storage,
              public userProvider: UserService, public activatedRoute: ActivatedRoute, public platform: Platform) {

    this.storage.get("GroupKey").then(res => {
      this.groupKey=res;
      console.log("already stored GroupKey =RS " +  this.groupKey);

    });
    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " +  this.groupKeyTabsy);

    });
    this.orderNo = this.activatedRoute.snapshot.paramMap.get("orderNo");
    console.log("orderNo  RS------ = " + this.orderNo);
    this.totalAmount = this.activatedRoute.snapshot.paramMap.get("orderAmount");
    console.log("totalAmount  RS------ = " + this.totalAmount);
    this.orderDate = this.activatedRoute.snapshot.paramMap.get("orderDate");
    console.log("orderDate  RS------ = " + this.orderDate);


    this.orderData = this.activatedRoute.snapshot.paramMap.get("orderData");
    console.log("orderDetails  RS------ = " + this.orderData);

    this.orderSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestion");
    console.log("orderSuggestion name RS------ = " + this.orderSuggestion);

    this.ourPaymentID=this.activatedRoute.snapshot.paramMap.get("ourPaymentID");
    console.log("OurPaymentID  RS------ = " + this.ourPaymentID);

    this.paymentID=this.activatedRoute.snapshot.paramMap.get("paymentID");
    console.log("PaymentID  RS------ = " + this.paymentID);

    this.paymentStatus=this.activatedRoute.snapshot.paramMap.get("paymentStatus");
    console.log("PaymentStatus  RS------ = " + this.paymentStatus);

    this.paymentMode=this.activatedRoute.snapshot.paramMap.get("paymentMode");
    console.log("PaymentMode  RS------ = " + this.paymentMode);

    this.pageName = this.activatedRoute.snapshot.paramMap.get("page");
    console.log("page name = " + this.pageName);


    this.storage.get('totalPayableAmountmsg').then((value) => {
      this.totalPayableAmountmsg = value;
      console.log("totalPayableAmountmsg = " + this.totalPayableAmountmsg);

    });
    this.storage.get('totalPayableAmountForDel').then((value) => {
      this.totalPayableAmountForDel = value;
      console.log("totalPayableAmountForDel = " + this.totalPayableAmountForDel);

    }); this.storage.get('remCreditLimit').then((value) => {
      this.remCreditLimit = value;
      console.log("remCreditLimit = " + this.remCreditLimit);

    });




    this.storage.get('userInfo').then((value) => {
      this.compData = value;

      this.cPhone1 = value.CompanyPhone1;
      console.log("cPhone1  = " + this.cPhone1);
      this.CreditLimit = value.CreditLimit;
      console.log("CreditLimit  = " + this.CreditLimit);


      this.userPhone = value.UserId;
      console.log("UserId  = " + this.userPhone);
      // if(this.pageName=="DeliveryAddressPage"){
      //   this.totalPayableAmountForMsg = this.totalPayableAmountForDel;
      //
      // }else {
      this.totalPayableAmountForMsg = this.totalPayableAmountmsg;
      // }
      this.smsConfirm = "Order Confirmed!!  Order Details - Order No. " + this.orderNo + " Amount: Rs." + this.totalPayableAmountForMsg + " Date " + this.orderDate.toString().replace('T', ' ') + "  for order details please check Mobile App.";
      this.smsConfirmCr = "Credit Limit Exceeding!! This order is exceeding your Credit Limit. Please contact the company for acceptance of the order.  Order Details - Order No. " + this.orderNo + " Amount: Rs." + this.totalPayableAmountForMsg + " Date " + this.orderDate.toString().replace('T', ' ') + "  for order details please check Mobile App.";
      console.log(this.smsConfirm);
      console.log(this.totalPayableAmountForMsg);
      console.log(this.orderNo);
      console.log(this.orderDate);

      this.storage.get("mobOrEmailTabsy").then(res => {
        this.mobOrEmailTabsy = res;
        console.log("mobOrEmailTabsy---- " +  this.mobOrEmailTabsy);

        if(this.mobOrEmailTabsy == "EMAIL") {
          this.userProvider.CustomerRequest_SendEmailForCode(this.groupKeyTabsy,this.userPhone, this.smsConfirm).then(res => {
            this.smsData = res;
            console.log('Msg Sent Sussessfully ---Email----1' + JSON.stringify(res));

          });

        }

        else {

          this.userProvider.apiSendSmS(this.groupKeyTabsy,this.userPhone, this.smsConfirm).then(res => {
            this.smsData = res;
            console.log('Msg Sent Sussessfully ---Mobile --1' + JSON.stringify(res));

          });
          console.log(this.remCreditLimit);
          console.log(this.CreditLimit);
          console.log(this.totalPayableAmountForMsg);
          if(this.totalPayableAmountForMsg > this.remCreditLimit )
          {
            console.log(this.remCreditLimit);
            console.log(this.CreditLimit);
            console.log(this.totalPayableAmountForMsg);
            this.userProvider.apiSendSmS(this.groupKeyTabsy,this.userPhone, this.smsConfirmCr).then(res => {
              this.smsData = res;
              console.log('Msg Sent Sussessfully ---Mobile -Cr-1' + JSON.stringify(res));
              this.storage.set('st_Flag',this.st_Flag);

            });
          }
        }
      });


    });
    this.storage.get('userInfo').then((value) => {
      this.compData = value;

      this.cPhone1 = value.CompanyPhone1;
      console.log("cPhone1  = " + this.cPhone1);
      this.userPhone = value.UserId;
      console.log("UserId  = " + this.userPhone);
      this.userPhoneForMag = this.userPhone;

      // if(this.pageName=="DeliveryAddressPage"){
      //   this.totalPayableAmountForMsg = this.totalPayableAmountForDel;
      //
      // }else {
      this.totalPayableAmountForMsg = this.totalPayableAmountmsg;
      // }
      this.smsConfirm2 = "Order Received!! from - " + this.userPhoneForMag + "  Order No. " + this.orderNo + " Amount: Rs." + this.totalPayableAmountForMsg + " for order details please check Mobile App.";
      console.log(this.userPhoneForMag);
      console.log(this.smsConfirm2);
      console.log(this.totalPayableAmountForMsg);

      this.userProvider.apiSendSmS(this.groupKeyTabsy,this.cPhone1, this.smsConfirm2).then(res1 => {
        this.smsData2 = res1;
        console.log('Msg Sent Sussessfully -----2' + JSON.stringify(res1));

      });


    });




  }

  ngOnInit() {
    console.log('ionViewDidLoad OrderSuccessfullPage');
  }

  async goToHome() {
    await this.navCtrl.navigateRoot(['/home']);
  }

}
