import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSharedPage } from '../header-shared/header-shared.page';



@NgModule({
  declarations: [HeaderSharedPage],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderSharedPage
  ]
})
export class SharedModuleModule { }
