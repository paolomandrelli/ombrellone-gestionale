import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stabilimento } from '../interfaces/stabilimento';
import { AuthService } from '../services/auth.service';
import { StabilimentiService } from '../services/resorts.service';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.page.html',
  styleUrls: ['./resorts.page.scss'],
})
export class ResortsPage implements OnInit {

  stabilimenti$: Observable<Stabilimento.Stabilimento[]>

  constructor(
    private ss: StabilimentiService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.stabilimenti$ = this.ss.getStabilimenti().pipe(
      map(d => d.payload)
    );
  }

}
