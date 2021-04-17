import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpasIntegrationPage } from './mpas-integration.page';

const routes: Routes = [
  {
    path: '',
    component: MpasIntegrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpasIntegrationPage]
})
export class MpasIntegrationPageModule {}
