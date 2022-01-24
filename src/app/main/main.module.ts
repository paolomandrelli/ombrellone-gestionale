import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { OmMenuBtnModule } from '../shared/om-menu-btn/om-menu-btn.module';

@NgModule({
  imports: [
    OmMenuBtnModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule { }
