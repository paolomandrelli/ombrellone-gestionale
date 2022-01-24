import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeachEditorPageRoutingModule } from './beach-editor-routing.module';

import { BeachEditorPage } from './beach-editor.page';
import { DragDropModule } from 'primeng/dragdrop';
import { OmMenuBtnModule } from 'src/app/shared/om-menu-btn/om-menu-btn.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    OmMenuBtnModule,
    ReactiveFormsModule,
    DialogModule,
    IonicModule,
    DragDropModule,
    BeachEditorPageRoutingModule
  ],
  declarations: [BeachEditorPage]
})
export class BeachEditorPageModule { }
