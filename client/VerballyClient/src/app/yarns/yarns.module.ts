import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YarnsPageRoutingModule } from './yarns-routing.module';

import { YarnsPage } from './yarns.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    YarnsPageRoutingModule
  ],
  declarations: [YarnsPage]
})
export class YarnsPageModule { }
