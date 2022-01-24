import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UmbrellaModalComponent } from './umbrella-modal.component';

@NgModule({
    declarations: [UmbrellaModalComponent],
    exports: [UmbrellaModalComponent],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class UmbrellaModalModule { }
