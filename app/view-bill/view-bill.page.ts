import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController /*, NavParams*/} from '@ionic/angular';
import {OrderService} from '../Providers/order/order.service';
import {UtilityService} from '../Providers/utility/utility.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.page.html',
  styleUrls: ['./view-bill.page.scss'],
})
export class ViewBillPage implements OnInit {

  public billList:any = [];
  public userType:any;
  public pageNo:any;

  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/ public utility:UtilityService, public loadingCtrl:LoadingController,
              public orderProvider:OrderService) {

    this.userType = this.utility.userType;
    this.pageNo = 1;
    this.getBillList("00000000-0000-0000-0000-000000000000",this.pageNo,20);

  }

  ngOnInit() {
    console.log('ionViewDidLoad ViewBillPage');
  }

  async getBillList(AcntId, pageNo, pageSize) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    await loading.present();
    this.orderProvider.RetrievePendingOrder(AcntId, 21, 0, pageNo, pageSize).then((data) => {
      console.log(data);
      this.billList = data;
      console.log();
      // this.presentToast(this.toastReturn.ReturnMessage);
      loading.dismiss();
    });
  }

  viewBillDetail(selectedBill,selectedBillNo){
    console.log("selected order = "+JSON.stringify(selectedBill))
    // this.orderProvider.RetrieveOrderByOrderId(selectedBill,"00000000-0000-0000-0000-000000000000",this.allData).then(res=>{
    //   this.selectedOrderDetail = res;
    //   console.log("---selected oerder detail -----"+JSON.stringify(this.selectedOrderDetail));
    //   if (this.selectedOrderDetail.ReturnMessage == "Done")
    //   {
    //     this.app.getRootNav().push(CartPage,{orderData:this.selectedOrderDetail, page:'pendingOrder'});
    //   }
    // })
    //   this.navCtrl.push(ViewBillDetailsPage);
  }


}
