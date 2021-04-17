import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RadiosolvePage } from './radiosolve.page';

const routes: Routes = [
  {
    path: '',
    component: RadiosolvePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RadiosolvePage]
})
export class RadiosolvePageModule {}
