import { Component, OnInit } from '@angular/core';
import {TabOrderListPage} from '../tab-order-list/tab-order-list.page';
import {PendingOrdersPage} from '../pending-orders/pending-orders.page';
import {TabOrderCompeletePage} from '../tab-order-compelete/tab-order-compelete.page';
import {NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {SwipeService} from '../Providers/swipe/swipe.service';

@Component({
  selector: 'app-order-list1',
  templateUrl: './order-list1.page.html',
  styleUrls: ['./order-list1.page.scss'],
})
export class OrderList1Page implements OnInit {
  page1: any = TabOrderListPage;
  page2: any = PendingOrdersPage;
  page3: any = TabOrderCompeletePage;
  public companyName: any;

  constructor(public navCtrl: NavController,
              public platform: Platform, public storage: Storage /*,private superTabsCtrl: SuperTabsController,*/,
              public swipeService: SwipeService) {
    this.storage.get('companyName').then(res => {
      this.companyName = res;
    });
  }

  ngOnInit() {
  }
  /* onTabSelect(ev: any) {
     console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);*/

/*  mohit1()
  {

    this.navCtrl.navigateForward(['/tab-order-list']);

  }*/


}

// ngAfterViewInit() {
//   // must wait for AfterViewInit if you want to modify the tabs instantly
//   this.superTabsCtrl.setBadge('allOrders', 5);
// }

/*hideToolbar() {


/!*
  this.superTabsCtrl.showToolbar(false);
*!/


}*/

/* showToolbar() {


/!*
   this.superTabsCtrl.showToolbar(true);
*!/


 }*/
