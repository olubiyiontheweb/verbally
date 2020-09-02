import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPage } from './front.page';

const routes: Routes = [
  {
    path: '',
    component: FrontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontPageRoutingModule { }
