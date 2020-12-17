import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrontPageRoutingModule } from './front-routing.module';

import { FrontPage } from './front.page';
import { HeaderLgComponent } from '../header-lg/header-lg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrontPageRoutingModule,
  ],
  declarations: [FrontPage, HeaderLgComponent]
})
export class FrontPageModule { }
