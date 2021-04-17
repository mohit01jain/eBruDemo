import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchItemPage } from './search-item.page';
import {SignInPage} from '../sign-in/sign-in.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchItemPage
      }
    ])
  ],
  declarations: [SearchItemPage]
})
export class SearchItemPageModule {}
