import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMResponsiveContainerComponent } from './om-responsive-container.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [OMResponsiveContainerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    OMResponsiveContainerComponent
  ]
})
export class OMResponsiveContainerModule { }
