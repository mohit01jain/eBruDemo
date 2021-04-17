import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController, Platform} from '@ionic/angular';
/*
import {App} from 'ionic-angular';
*/
import {OrderService} from '../Providers/order/order.service';
import {UtilityService} from '../Providers/utility/utility.service';
import {CartPage} from '../cart/cart.page';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {SwipeService} from "../Providers/swipe/swipe.service";


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.page.html',
  styleUrls: ['./pending-orders.page.scss'],
})
export class PendingOrdersPage implements OnInit {
  public ItemList: any=[];
  public AcntId: any;
  public selectedOrderDetail:any;
  public allData:any;
  public pageNo:any;
  public extendedItemList:any=[];
  public searchByType:any;
  public userType:any;
  private deliveryChargesAmt: any;
  public orderSuggestion: any;
  public length: any;
  // private unregisterBackButtonAction: any;
  constructor(public navCtrl: NavController,
              public orderProvider: OrderService,/*private app: App,*/public activatedRoute: ActivatedRoute,
              public storage: Storage,public loadingCtrl: LoadingController,
              public platform: Platform,public utility:UtilityService, private swipeService: SwipeService) {

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = "+this.deliveryChargesAmt);


    storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.searchByType = "All";
      this.userType = this.utility.userType;
      console.log("-----user type---- "+this.userType);
      if (this.utility.userType == 5){
        this.retrieve_api(this.AcntId,12,this.pageNo,20);
      } else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000",12,this.pageNo,20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });
    // this.retrieve_api();

  }

  ngOnInit() {


    }



  async retrieve_api(AcntId,status,pageNo,pageSize) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });

    // loading.present();
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.orderProvider.RetrievePendingOrder(AcntId,1,status,pageNo,pageSize).then((data) => {
      console.log(data);
      this.ItemList = data;
      console.log();
      // this.presentToast(this.toastReturn.ReturnMessage);
       loading.dismiss();
    });
  }

  async updateOrder(selectedData, data) {
    console.log("selected order = " + JSON.stringify(selectedData));
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    await loading.present();
    this.orderProvider.RetrieveOrderByOrderId(selectedData, this.AcntId, this.allData).then(res => {
      this.selectedOrderDetail = res;
      this.storage.set("selectedOrderData", this.selectedOrderDetail);

      console.log("---selected order detail ---RS--" + JSON.stringify(this.selectedOrderDetail.RoundOffAmt));

      console.log("---selected order detail full data----RS-" + JSON.stringify(this.selectedOrderDetail));
      this.orderSuggestion = this.selectedOrderDetail.Description;
      if (this.selectedOrderDetail.ReturnMessage == "Done") {
        console.log("---selected oerder detail ---RS--" + JSON.stringify(this.selectedOrderDetail.RoundOffAmt));

        if (this.userType == 5) {
          this.navCtrl.navigateForward(['cart', {
            orderData: JSON.stringify(this.selectedOrderDetail),
            'orderSuggestionDesc': this.orderSuggestion,
            page: 'pendingOrder'
          }]);
           loading.dismiss();
        } else if (this.userType == 2) {
          console.log("---selected oerder detail ---RS--" + JSON.stringify(this.selectedOrderDetail.RoundOffAmt));

          this.navCtrl.navigateForward(['cart', {
            orderData:JSON.stringify(this.selectedOrderDetail),
            'orderSuggestionDesc': this.orderSuggestion,
            page: 'viewOrder'
          }]);
           loading.dismiss();
        }
      }
    })
    // this.navCtrl.push(CartPage,{orderNo:data, page:'pendingOrder'});

  }

  searchBy(value)
  {
    this.searchByType = value;
    if(value=="All")
    {
      this.pageNo =1;
      console.log("Search by = "+value);
      if (this.utility.userType == 5) {
        this.retrieve_api(this.AcntId, 12, 1, 20);
      }else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000", 12, 1, 20);
      }
    }
    else{

      if(value=="Partially Pending")
      {
        this.pageNo = 1;
        console.log("Search by = "+value);
        if (this.utility.userType == 5) {
          this.retrieve_api(this.AcntId, 2, 1, 20);
        }else if (this.utility.userType == 2){
          this.retrieve_api("00000000-0000-0000-0000-000000000000", 2, 1, 20);
        }
      }
      else
      {
        this.pageNo = 1;
        console.log("Search by = "+value);
        if (this.utility.userType == 5) {
          this.retrieve_api(this.AcntId, 1, 1, 20);
        }else if (this.utility.userType == 2){
          this.retrieve_api("00000000-0000-0000-0000-000000000000", 1, 1, 20);
        }
      }
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNo = this.pageNo +1;
    console.log("--page no--"+this.pageNo);

    setTimeout(() => {

      if (this.utility.userType == 5) {
        if (this.searchByType == "All") {
          console.log("Search by = " + this.searchByType);
          this.orderProvider.RetrievePendingOrder(this.AcntId,1, 12, this.pageNo, 20).then((data) => {
            console.log(data);
            this.extendedItemList = data;
            console.log("---extendable listview----" + this.extendedItemList.length);
            for (var i = 0; i < this.extendedItemList.length; i++) {
              this.ItemList.push(this.extendedItemList[i]);
            }
          });
        } else {

          if (this.searchByType == "Partially Pending") {
            console.log("Search by = " + this.searchByType);
            this.orderProvider.RetrievePendingOrder(this.AcntId,1,2, this.pageNo, 20).then((data) => {
              console.log(data);
              this.extendedItemList = data;
              console.log("---extendable listview----" + this.extendedItemList.length);
              for (var i = 0; i < this.extendedItemList.length; i++) {
                this.ItemList.push(this.extendedItemList[i]);
              }
            });

          } else {
            console.log("Search by = " + this.searchByType);
            this.orderProvider.RetrievePendingOrder(this.AcntId,1, 1, this.pageNo, 20).then((data) => {
              console.log(data);
              this.extendedItemList = data;
              console.log("---extendable listview----" + this.extendedItemList.length);
              for (var i = 0; i < this.extendedItemList.length; i++) {
                this.ItemList.push(this.extendedItemList[i]);
              }
            });


          }
        }
      }else {
        if (this.utility.userType == 2) {
          if (this.searchByType == "All") {
            console.log("Search by = " + this.searchByType);
            this.orderProvider.RetrievePendingOrder("00000000-0000-0000-0000-000000000000",1, 12, this.pageNo, 20).then((data) => {
              console.log(data);
              this.extendedItemList = data;
              console.log("---extendable listview----" + this.extendedItemList.length);
              for (var i = 0; i < this.extendedItemList.length; i++) {
                this.ItemList.push(this.extendedItemList[i]);
              }
            });
          } else {

            if (this.searchByType == "Partially Pending") {
              console.log("Search by = " + this.searchByType);
              this.orderProvider.RetrievePendingOrder("00000000-0000-0000-0000-000000000000",1, 2, this.pageNo, 20).then((data) => {
                console.log(data);
                this.extendedItemList = data;
                console.log("---extendable listview----" + this.extendedItemList.length);
                for (var i = 0; i < this.extendedItemList.length; i++) {
                  this.ItemList.push(this.extendedItemList[i]);
                }
              });

            } else {
              console.log("Search by = " + this.searchByType);
              this.orderProvider.RetrievePendingOrder("00000000-0000-0000-0000-000000000000", 1,1, this.pageNo, 20).then((data) => {
                console.log(data);
                this.extendedItemList = data;
                console.log("---extendable listview----" + this.extendedItemList.length);
                for (var i = 0; i < this.extendedItemList.length; i++) {
                  this.ItemList.push(this.extendedItemList[i]);
                }
              });

            }
          }
        }
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  ionViewWillEnter(){

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = "+this.deliveryChargesAmt);


    this.storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.searchByType = "All";
      this.userType = this.utility.userType;
      console.log("-----user type---- "+this.userType);
      if (this.utility.userType == 5){
        this.retrieve_api(this.AcntId,12,this.pageNo,20);
      } else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000",12,this.pageNo,20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });


  }

  ionViewDidLoad(){

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = "+this.deliveryChargesAmt);


    this.storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.searchByType = "All";
      this.userType = this.utility.userType;
      console.log("-----user type---- "+this.userType);
      if (this.utility.userType == 5){
        this.retrieve_api(this.AcntId,12,this.pageNo,20);
      } else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000",12,this.pageNo,20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });


  }

  ionViewDidEnter(){

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = "+this.deliveryChargesAmt);


    this.storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.searchByType = "All";
      this.userType = this.utility.userType;
      console.log("-----user type---- "+this.userType);
      if (this.utility.userType == 5){
        this.retrieve_api(this.AcntId,12,this.pageNo,20);
      } else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000",12,this.pageNo,20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });


  }

  ionViewDidLeave(){

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = "+this.deliveryChargesAmt);


    this.storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.searchByType = "All";
      this.userType = this.utility.userType;
      console.log("-----user type---- "+this.userType);
      if (this.utility.userType == 5){
        this.retrieve_api(this.AcntId,12,this.pageNo,20);
      } else if (this.utility.userType == 2){
        this.retrieve_api("00000000-0000-0000-0000-000000000000",12,this.pageNo,20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });


  }

}

