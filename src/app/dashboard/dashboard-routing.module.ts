import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustGoToMainGuard } from '../guards/must-go-to-main.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
      },
      {
        path: 'beach-editor',
        loadChildren: () => import('../beach-editor/beach-editor.module').then(m => m.BeachEditorPageModule)
      },
      {
        path: 'resorts',
        loadChildren: () => import('../resorts/resorts.module').then(m => m.ResortsPageModule)
      },

      {
        path: 'resorts/:id',
        loadChildren: () => import('../resort/resort.module').then(m => m.ResortPageModule)
      },

      {
        path: 'reservations-editor',
        loadChildren: () => import('../reservations-editor/reservations-editor.module').then(m => m.ReservationsEditorPageModule)
      },
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'huge-img',
        loadChildren: () => import('../huge-img/huge-img.module').then(m => m.HugeImgPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
