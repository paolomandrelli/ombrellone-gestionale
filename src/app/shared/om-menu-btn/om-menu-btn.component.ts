import { Component, OnInit } from '@angular/core';
import { MenuBtnService } from 'src/app/services/menu-btn.service';

@Component({
  selector: 'om-menu-btn',
  templateUrl: './om-menu-btn.component.html',
  styleUrls: ['./om-menu-btn.component.scss'],
})
export class OmMenuBtnComponent implements OnInit {

  constructor(
    private mbs: MenuBtnService
  ) { }

  ngOnInit() { }

  trigger(): void {
    this.mbs.trigger(true);
  }

}
