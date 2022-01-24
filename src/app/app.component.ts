import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterContentInit, OnInit {

  @ViewChild('menu', { static: true }) menu: IonMenu;

  public appPages = [
    { title: 'Immagine ', url: '/beach-pic', icon: 'image' },
    { title: 'Designer ', url: '/beach-designer', icon: 'create' },
    { title: 'Prezzi', url: '/prices-designer', icon: 'cash' },
    { title: 'Gestione', url: '/management', icon: 'document-attach' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }

  ngAfterContentInit(): void {
    console.log(this.menu);
  }
}
