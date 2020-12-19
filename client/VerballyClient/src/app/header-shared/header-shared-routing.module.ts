import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderSharedPage } from './header-shared.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderSharedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderSharedPageRoutingModule {}
