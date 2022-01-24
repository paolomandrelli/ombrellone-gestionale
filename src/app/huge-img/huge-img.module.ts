import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HugeImgPageRoutingModule } from './huge-img-routing.module';

import { HugeImgPage } from './huge-img.page';
import { OmMenuBtnModule } from '../shared/om-menu-btn/om-menu-btn.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OmMenuBtnModule,
    IonicModule,
    HugeImgPageRoutingModule
  ],
  declarations: [HugeImgPage]
})
export class HugeImgPageModule { }
