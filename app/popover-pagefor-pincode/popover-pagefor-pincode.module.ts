import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopoverPageforPincodePage } from './popover-pagefor-pincode.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverPageforPincodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PopoverPageforPincodePage]
})
export class PopoverPageforPincodePageModule {}
