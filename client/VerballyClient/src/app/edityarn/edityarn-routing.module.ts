import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdityarnPage } from './edityarn.page';

const routes: Routes = [
  {
    path: '',
    component: EdityarnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdityarnPageRoutingModule {}
