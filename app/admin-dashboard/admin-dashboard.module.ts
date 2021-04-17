import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPage } from './admin-dashboard.page';
import {HomePage} from '../home/home.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardPage
      }
    ])
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
