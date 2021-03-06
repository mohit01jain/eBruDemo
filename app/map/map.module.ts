import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import {AgmCoreModule} from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        AgmCoreModule
    ],
  declarations: [MapPage]
})
export class MapPageModule {}
