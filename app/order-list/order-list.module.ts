import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrderListPage } from './order-list.page';
/*
import { OrderListPageRoutingModule } from './order-list.router.module';
*/

/*import { OrderListPage } from './order-list.page';*/
/*
import {SuperTabsModule} from 'ionic2-super-tabs';
*/
/*import {PendingOrdersPage} from '../pending-orders/pending-orders.page';*/


const routes: Routes = [
    {
        path: 'order-list',
        component: OrderListPage,
        children:[
            { path: 'pending-orders', loadChildren: '../pending-orders/pending-orders.module#PendingOrdersPageModule' },
            { path: 'tab-order-list', loadChildren: '../tab-order-list/tab-order-list.module#TabOrderListPageModule' },
            { path: 'tab-order-compelete', loadChildren: '../tab-order-compelete/tab-order-compelete.module#TabOrderCompeletePageModule' },
        ]
    },
    {
        path:'',
        redirectTo:'/order-list/pending-orders',
        pathMatch:'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
/*
        OrderListPageRoutingModule,
*/
        RouterModule.forChild(routes)
           /* {
                path: '',
                component: OrderListPage
            }
        ]),*/

    ],
  declarations: [OrderListPage]
})
export class OrderListPageModule {}
