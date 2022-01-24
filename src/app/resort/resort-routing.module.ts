import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResortPage } from './resort.page';

const routes: Routes = [
  {
    path: '',
    component: ResortPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResortPageRoutingModule {}
