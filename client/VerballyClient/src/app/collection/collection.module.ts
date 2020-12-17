import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionPageRoutingModule } from './collection-routing.module';

import { CollectionPage } from './collection.page';

import { PipesModule } from '../pipe.module';
import { HeaderLgComponent } from '../header-lg/header-lg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CollectionPageRoutingModule
  ],
  declarations: [CollectionPage, HeaderLgComponent]
})
export class CollectionPageModule { }
