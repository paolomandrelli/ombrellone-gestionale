import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OMBaseClass } from '../base-classes/om-base-class';
import { Stabilimento } from '../interfaces/stabilimento';
import { StabilimentiService } from '../services/resorts.service';

@Component({
  selector: 'app-resort',
  templateUrl: './resort.page.html',
  styleUrls: ['./resort.page.scss'],
})
export class ResortPage extends OMBaseClass implements OnInit {

  resort$: Observable<Stabilimento.Stabilimento>;
  stabilimentoId: string | number;

  form: FormGroup;

  constructor(
    private ss: StabilimentiService,
    private ar: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
    this.form = this.fb.group({
      nome: [null, Validators.required],
      descrizione: [],
      indirizzo: [],
      telefono: [],
      telefono_wa: [],
      email: [],
      sito: [],
      latitudine: [],
      longitudine: [],
      link: [],
      visibile: [],
      cliente: [],
      flag_ann: [0],
      data_creazione: [],
      data_modifica: []
    })
  }

  ionViewDidEnter() {
    this.stabilimentoId = this.ar.snapshot.params.id;
    this.resort$ = this.ss.getStabilimento(this.stabilimentoId).pipe(
      shareReplay(),
      map(d => {
        this.form.patchValue(d.payload);
        return d.payload
      })
    );
  }

  ngOnInit() {
  }

}
