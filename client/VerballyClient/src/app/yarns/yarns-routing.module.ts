import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YarnsPage } from './yarns.page';

const routes: Routes = [
  {
    path: '',
    component: YarnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YarnsPageRoutingModule {}
