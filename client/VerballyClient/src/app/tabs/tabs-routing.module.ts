import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceAuthGuardService } from '../services/service-auth-guard.service';


import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'front',
        loadChildren: () => import('../front/front.module').then(m => m.FrontPageModule)
      },
      {
        path: 'yarns',
        loadChildren: () => import('../yarns/yarns.module').then(m => m.YarnsPageModule)
      },
      {
        path: 'yarn',
        loadChildren: () => import('../yarn/yarn.module').then(m => m.YarnPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'sigin',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'confirmations/:confirmation_token',
        canActivate: [ServiceAuthGuardService],
        loadChildren: () => import('../confirmregistration/confirmregistration.module').then(m => m.ConfirmregistrationPageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/front',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tabs/front',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
