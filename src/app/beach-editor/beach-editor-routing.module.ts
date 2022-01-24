import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeachEditorPage } from './beach-editor.page';

const routes: Routes = [
  {
    path: '',
    component: BeachEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeachEditorPageRoutingModule {}
