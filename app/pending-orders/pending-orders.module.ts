import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {PendingOrdersPage} from './pending-orders.page';

/*
import { PendingOrdersPage } from './pending-orders.page';
*/
/*
import {SearchItemPage} from '../search-item/search-item.page';
*/
const routes: Routes = [

  {
    path: '',
    component: PendingOrdersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PendingOrdersPage]  /*PendingOrdersPage*/
})
export class PendingOrdersPageModule {}
