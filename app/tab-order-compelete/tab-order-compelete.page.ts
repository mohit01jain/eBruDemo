import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController, /*NavParams,*/ Platform} from '@ionic/angular';
import {UtilityService} from '../Providers/utility/utility.service';
import {OrderService} from '../Providers/order/order.service';
import {Storage} from '@ionic/storage';
import {SwipeService} from "../Providers/swipe/swipe.service";


@Component({
  selector: 'app-tab-order-compelete',
  templateUrl: './tab-order-compelete.page.html',
  styleUrls: ['./tab-order-compelete.page.scss'],
})
export class TabOrderCompeletePage implements OnInit {
  public ItemList: any;
  public AcntId: any;
  public pageNo:any;
  public extendedItemList:any=[];
  public userType:any;
  // private unregisterBackButtonAction: any;
  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/ public orderProvider: OrderService,public utility:UtilityService,
              public storage: Storage,public loadingCtrl: LoadingController,public platform: Platform,private swipeService: SwipeService) {  storage.get('AcntId').then((data) => {
    console.log(data);
    this.AcntId = data;
    this.pageNo =1;
    this.userType = this.utility.userType;
    if (this.utility.userType == 5){
      this.retrieve_api(this.AcntId,this.pageNo,20);
    } else if (this.utility.userType == 2){
      this.retrieve_api("00000000-0000-0000-0000-000000000000",this.pageNo,20);
    }
  });
    // this.retrieve_api();
  }

  ngOnInit() {
  }

  retrieve_api(AcntId,pageNo,pageSize) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    //
    // loading.present();
    this.orderProvider.RetrievePendingOrder(AcntId,1,3,pageNo,pageSize).then((data) => {
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
        this.orderProvider.RetrievePendingOrder(this.AcntId,1,3,this.pageNo,20).then((data) => {
          console.log(data);
          this.extendedItemList = data;
          // this.ItemList.push(this.extendedItemList);
          console.log("---extendable listview----"+this.extendedItemList.length);
          for (var i=0;i<this.extendedItemList.length;i++){
            this.ItemList.push(this.extendedItemList[i]);
          }
          // this.presentToast(this.toastReturn.ReturnMessage);

        });
      }else if (this.utility.userType == 2){
        this.orderProvider.RetrievePendingOrder("00000000-0000-0000-0000-000000000000",1,3,this.pageNo,20).then((data) => {
          console.log(data);
          this.extendedItemList = data;
          // this.ItemList.push(this.extendedItemList);
          console.log("---extendable listview----"+this.extendedItemList.length);
          for (var i=0;i<this.extendedItemList.length;i++){
            this.ItemList.push(this.extendedItemList[i]);
          }
          // this.presentToast(this.toastReturn.ReturnMessage);

        });
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  updateOrder(data){
    this.navCtrl.navigateForward(['CartPage',{orderNo:JSON.stringify(data), page:'pendingOrder'}]);

  }
}

