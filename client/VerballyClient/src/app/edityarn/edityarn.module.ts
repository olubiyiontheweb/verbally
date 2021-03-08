import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdityarnPageRoutingModule } from './edityarn-routing.module';

import { EdityarnPage } from './edityarn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdityarnPageRoutingModule
  ],
  declarations: [EdityarnPage]
})
export class EdityarnPageModule {}
