import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderList1Page } from './order-list1.page';

const routes: Routes = [

  {
    path: 'order-list1',
    component: OrderList1Page,
    children:[
      { path: 'pending-orders', loadChildren: '../pending-orders/pending-orders.module#PendingOrdersPageModule' },
      { path: 'tab-order-list', loadChildren: '../tab-order-list/tab-order-list.module#TabOrderListPageModule' },
      { path: 'tab-order-compelete', loadChildren: '../tab-order-compelete/tab-order-compelete.module#TabOrderCompeletePageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/order-list1/pending-orders',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderList1Page]
})
export class OrderList1PageModule {}
