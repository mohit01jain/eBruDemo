import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderSuccessfullPage } from './order-successfull.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSuccessfullPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderSuccessfullPage]
})
export class OrderSuccessfullPageModule {}
