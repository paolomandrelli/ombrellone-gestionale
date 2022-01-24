import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HugeImgPage } from './huge-img.page';

const routes: Routes = [
  {
    path: '',
    component: HugeImgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HugeImgPageRoutingModule {}
