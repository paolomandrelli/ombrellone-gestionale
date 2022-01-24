import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResortsPage } from './resorts.page';

const routes: Routes = [
  {
    path: '',
    component: ResortsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResortsPageRoutingModule {}
