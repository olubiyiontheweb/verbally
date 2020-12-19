import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YarnPageRoutingModule } from './yarn-routing.module';

import { YarnPage } from './yarn.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModuleModule,
    YarnPageRoutingModule
  ],
  declarations: [YarnPage]
})
export class YarnPageModule { }
