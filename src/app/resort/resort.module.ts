import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResortPageRoutingModule } from './resort-routing.module';

import { ResortPage } from './resort.page';
import { OmMenuBtnModule } from '../shared/om-menu-btn/om-menu-btn.module';
import { ButtonModule } from 'primeng/button';
import { StabilimentiService } from '../services/resorts.service';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  imports: [
    CommonModule,
    OmMenuBtnModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    IonicModule,
    ResortPageRoutingModule
  ],
  providers: [
    StabilimentiService
  ],
  declarations: [ResortPage]
})
export class ResortPageModule { }
