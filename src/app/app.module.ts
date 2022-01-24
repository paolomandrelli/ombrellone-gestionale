import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxStronglyTypedFormsModule } from 'ngx-strongly-typed-forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { OMInterceptor } from './interceptors/om-inteceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    RippleModule,
    ToastModule,
    BrowserAnimationsModule,
    NgxStronglyTypedFormsModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: OMInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
