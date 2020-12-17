import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmregistrationPageRoutingModule } from './confirmregistration-routing.module';

import { ConfirmregistrationPage } from './confirmregistration.page';
import { HeaderLgComponent } from '../header-lg/header-lg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmregistrationPageRoutingModule
  ],
  declarations: [ConfirmregistrationPage, HeaderLgComponent]
})
export class ConfirmregistrationPageModule { }
