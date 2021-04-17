import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValidateKeyPage } from './validate-key.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateKeyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValidateKeyPage]
})
export class ValidateKeyPageModule {}
