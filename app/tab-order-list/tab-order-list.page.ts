import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController, /*NavParams,*/ Platform} from '@ionic/angular';

import {UtilityService} from '../Providers/utility/utility.service';
import {OrderService} from '../Providers/order/order.service';
import {CartPage} from '../cart/cart.page';
import {Storage} from '@ionic/storage';
import {SwipeService} from "../Providers/swipe/swipe.service";
import {ActivatedRoute} from '@angular/router';
/*
import {App} from 'ionic-angular';
*/



@Component({
  selector: 'app-tab-order-list',
  templateUrl: './tab-order-list.page.html',
  styleUrls: ['./tab-order-list.page.scss'],
})
export class TabOrderListPage implements OnInit {
  public ItemList: any=[];
  public AcntId: any;
  public selectedOrderDetail:any;
  public allData:any;
  public pageNo:any;
  public extendedItemList:any=[];
  public userType:any;
  private deliveryChargesAmt: any;
  public orderSuggestion: any;

  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/ public activatedRoute: ActivatedRoute, public orderProvider: OrderService,public utility:UtilityService,
              public storage: Storage,public loadingCtrl: LoadingController,/*private app: App,*/public platform: Platform,private swipeService: SwipeService) {

    this.deliveryChargesAmt = this.activatedRoute.snapshot.paramMap.get("deliveryChargesAmount");
    console.log("Delivery Charge amount = " + this.deliveryChargesAmt);


    storage.get('AcntId').then((data) => {
      console.log(data);
      this.AcntId = data;
      this.pageNo = 1;
      this.userType = this.utility.userType;
      if (this.utility.userType == 5) {
        this.retrieve_api(this.AcntId, this.pageNo, 20);
      } else if (this.utility.userType == 2) {
        this.retrieve_api("00000000-0000-0000-0000-000000000000", this.pageNo, 20);
      }

    });

    this.storage.get('userInfo').then((value) => {
      this.allData = value;
      console.log('User DAta -----', this.allData);

    });
    // this.retrieve_api();}

  }

  ngOnInit() {
  }

  retrieve_api(AcntId,pageNo,pageSize) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    //
    // loading.present();
    this.orderProvider.RetrievePendingOrder(AcntId,1,0,pageNo,pageSize).then((data) => {
      console.log(data);
      this.ItemList = data;
      console.log();
      // this.presentToast(this.toastReturn.ReturnMessage);
      // loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNo = this.pageNo +1;
    console.log("--page no--"+this.pageNo);

    setTimeout(() => {
      if (this.utility.userType == 5){
        this.orderProvider.RetrievePendingOrder(this.AcntId,1,0,this.pageNo,20).then((data) => {
          console.log(data);
          this.extendedItemList = data;
          console.log("---extendable listview----"+this.extendedItemList.length);
          for (var i=0;i<this.extendedItemList.length;i++){
            this.ItemList.push(this.extendedItemList[i]);
          }
        });
      }else if (this.utility.userType == 2){
        this.orderProvider.RetrievePendingOrder("00000000-0000-0000-0000-000000000000",1,0,this.pageNo,20).then((data) => {
          console.log(data);
          this.extendedItemList = data;
          console.log("---extendable listview----"+this.extendedItemList.length);
          for (var i=0;i<this.extendedItemList.length;i++){
            this.ItemList.push(this.extendedItemList[i]);
          }
        });
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  updateOrder(selectedData,data){
    if (selectedData.OrderStatus == 1 || selectedData.OrderStatus == 2) {
      console.log("order status = "+ selectedData.OrderStatus);
      // let loading = this.loadingCtrl.create({
      //   content: 'Please wait...'
      // });
      //
      // loading.present();
      this.orderProvider.RetrieveOrderByOrderId(selectedData, this.AcntId,this.allData).then(res=>{
        this.selectedOrderDetail = res;
        console.log("---selected oerder detail -----"+JSON.stringify(this.selectedOrderDetail));
        this.orderSuggestion = this.selectedOrderDetail.Description;

        if (this.selectedOrderDetail.ReturnMessage == "Done")
        {
          if (this.userType == 5){
            this.navCtrl.navigateForward(['cart',{orderData:JSON.stringify(this.selectedOrderDetail),'orderSuggestionDesc':this.orderSuggestion, page:'pendingOrder'}]);
            // loading.dismiss();
          } else if (this.userType == 2){
            this.navCtrl.navigateForward(['cart',{orderData:JSON.stringify (this.selectedOrderDetail),'orderSuggestionDesc':this.orderSuggestion,page:'viewOrder'}]);
            // loading.dismiss();
          }
        }
      })
    }
    else if (selectedData.OrderStatus == 3 || selectedData.OrderStatus == 4) {

    }

  }


}
