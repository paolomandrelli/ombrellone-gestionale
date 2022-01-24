import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsEditorPageRoutingModule } from './reservations-editor-routing.module';

import { ReservationsEditorPage } from './reservations-editor.page';
import { OmMenuBtnModule } from '../shared/om-menu-btn/om-menu-btn.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    IonicModule,
    OmMenuBtnModule,
    ReservationsEditorPageRoutingModule
  ],
  declarations: [ReservationsEditorPage]
})
export class ReservationsEditorPageModule { }
