import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule, PopoverController} from '@ionic/angular';

import { NewAddressPage } from './new-address.page';
import {EditDeliveryAddressPage} from '../edit-delivery-address/edit-delivery-address.page';

const routes: Routes = [
  {
    path: '',
    component: NewAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewAddressPage],

})
export class NewAddressPageModule {}
