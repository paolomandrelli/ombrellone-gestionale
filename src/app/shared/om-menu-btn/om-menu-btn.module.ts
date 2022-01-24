import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmMenuBtnComponent } from './om-menu-btn.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [OmMenuBtnComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    OmMenuBtnComponent
  ]
})
export class OmMenuBtnModule { }
