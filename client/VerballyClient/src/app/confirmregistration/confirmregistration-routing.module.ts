import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmregistrationPage } from './confirmregistration.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmregistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmregistrationPageRoutingModule {}
