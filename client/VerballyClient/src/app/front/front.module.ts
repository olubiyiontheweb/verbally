import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrontPageRoutingModule } from './front-routing.module';

import { FrontPage } from './front.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    FrontPageRoutingModule,
  ],
  declarations: [FrontPage]
})
export class FrontPageModule { }
