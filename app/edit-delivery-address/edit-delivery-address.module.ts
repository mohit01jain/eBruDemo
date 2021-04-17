import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule, ModalController, PopoverController} from '@ionic/angular';

import { EditDeliveryAddressPage } from './edit-delivery-address.page';
import {AppComponent} from '../app.component';
import {IonicPageModule} from 'ionic-angular';
import {AddressService} from '../Providers/address/address.service';

const routes: Routes = [
  {
    path: '',
    component: EditDeliveryAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicPageModule.forChild(EditDeliveryAddressPage),

  ],
  declarations: [EditDeliveryAddressPage],
  entryComponents: [
    EditDeliveryAddressPage,
  ]
})
export class EditDeliveryAddressPageModule {}
