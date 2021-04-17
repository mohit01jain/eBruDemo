import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabOrderCompeletePage } from './tab-order-compelete.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabOrderCompeletePage
      }
    ])
  ],
  declarations: [TabOrderCompeletePage]
})
export class TabOrderCompeletePageModule {}
