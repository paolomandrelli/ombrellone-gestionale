import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { MenuBtnService } from '../services/menu-btn.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  appPages = [];
  labels = [];

  display = false;

  displaySub: Subscription;

  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi-home', routerLink: '/dashboard' },
    { label: 'Stabilimenti', icon: 'pi pi-list', routerLink: '/dashboard/resorts' },
    { label: 'Gestisci Spiaggia', icon: 'pi pi-fw pi-download', routerLink: '/dashboard/beach-editor' },
    { label: 'Gestisci Prenotazioni', icon: 'pi pi-fw pi-book', routerLink: '/dashboard/reservations-editor' },
    { label: 'Impostazioni', icon: 'pi pi-cog', routerLink: '/dashboard/settings' }
  ];

  constructor(
    public mbs: MenuBtnService,
    private confirmationService: ConfirmationService,
    private ac: AlertController,
    private r: Router

  ) { }

  ngOnInit() {
    this.displaySub = this.mbs.triggerMenuBtn$.subscribe((newValue) => {
      this.display = newValue;
    })
  }

  trigger(bool: boolean): void {
    this.mbs.trigger(bool);
  }

  async logout() {
    const a = await this.ac.create({
      header: 'Conferma Azione',
      message: 'Confermi di voler eseguire il logout?',
      buttons: [
        {
          role: 'cancel',
          text: 'Annulla'
        }, {
          text: 'Conferma',
          handler: () => {
            this.mbs.trigger(false);
            this.r.navigate([`/`], {
              replaceUrl: true
            });
          }
        }
      ]
    });
    a.present();
  }

}
