import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmregistrationPageRoutingModule } from './confirmregistration-routing.module';

import { ConfirmregistrationPage } from './confirmregistration.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    ConfirmregistrationPageRoutingModule
  ],
  declarations: [ConfirmregistrationPage]
})
export class ConfirmregistrationPageModule { }
