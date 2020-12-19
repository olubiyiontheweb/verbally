import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderSharedPageRoutingModule } from './header-shared-routing.module';

import { HeaderSharedPage } from './header-shared.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderSharedPageRoutingModule
  ],
  declarations: [HeaderSharedPage]
})
export class HeaderSharedPageModule {}
