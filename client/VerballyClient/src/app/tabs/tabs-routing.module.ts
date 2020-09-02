import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'collection',
        loadChildren: () => import('../collection/collection.module').then(m => m.CollectionPageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then(m => m.PostPageModule)
      },
      {
        path: 'share',
        loadChildren: () => import('../share/share-routing.module').then(m => m.SharePageRoutingModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'sigin',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/front',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
