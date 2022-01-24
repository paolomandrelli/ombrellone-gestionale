import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsEditorPage } from './reservations-editor.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsEditorPageRoutingModule {}
