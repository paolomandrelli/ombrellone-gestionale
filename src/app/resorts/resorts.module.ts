import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResortsPageRoutingModule } from './resorts-routing.module';

import { ResortsPage } from './resorts.page';
import { CardModule } from 'primeng/card';
import { OmMenuBtnModule } from '../shared/om-menu-btn/om-menu-btn.module';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { StabilimentiService } from '../services/resorts.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@NgModule({
  imports: [
    CommonModule,
    RippleModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    IonicModule,
    ProgressBarModule,
    OmMenuBtnModule,
    InputTextModule,
    ResortsPageRoutingModule
  ],
  declarations: [ResortsPage],
  providers: [
    StabilimentiService
  ]
})
export class ResortsPageModule { }

