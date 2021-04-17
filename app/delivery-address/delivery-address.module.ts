import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryAddressPage } from './delivery-address.page';
/*
import {TooltipsModule} from 'ionic-tooltips';
*/
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {EditDeliveryAddressPage} from '../edit-delivery-address/edit-delivery-address.page';
import {AddressService} from '../Providers/address/address.service';


/*const routes: Routes = [
  {
    path: '',
    component: DeliveryAddressPage
  }
];*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DeliveryAddressPage
      }
    ]),
/*
    TooltipsModule.forRoot(),
*/
    BrowserAnimationsModule,
    RouterTestingModule,


  ],
  entryComponents: [
    EditDeliveryAddressPage, 

  ],
  declarations: [DeliveryAddressPage],
/*
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
*/
})
export class DeliveryAddressPageModule {}
