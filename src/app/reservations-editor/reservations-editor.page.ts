import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { concatMap, delay, map, shareReplay } from 'rxjs/operators';

import { OMBaseClass } from '../base-classes/om-base-class';
import { OMBaseResponse } from '../interfaces/om-base-response';
import { Stabilimento } from '../interfaces/stabilimento';
import { OmbrelloneService } from '../services/ombrellone.service';
import { ReservationService } from '../services/reservation.service';
import { StabilimentiService } from '../services/resorts.service';
import { UserService } from '../services/user.service';
import { BeachBaseClass } from '../shared/beach-base-class';

@Component({
  selector: 'app-reservations-editor',
  templateUrl: './reservations-editor.page.html',
  styleUrls: ['./reservations-editor.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opacity: 0
      })),
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('500ms', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('500ms', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ReservationsEditorPage extends BeachBaseClass implements OnInit {

  users$: Observable<any[]>;

  addClient = false;

  userForm: FormGroup;

  reservationForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected os: OmbrelloneService,
    protected us: UserService,
    protected rs: ReservationService,
    protected ss: StabilimentiService
  ) {
    super(fb, os, us, ss);
    this.form = this.fb.group({
      selectedStabilimento: [],
      umbrellas: this.fb.array([])
    });

    this.userForm = this.fb.group({

      name: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      source: [''],
      invitation_code: ['']
    });

    this.reservationForm = this.fb.group(
      {
        id_utente_acquirente: 0, // non funziona la creazione né reperimento lista utenti
        id_utente_abbonato: 0,
        id_stabilimento: 0,
        id_stato_carrello: 0,
        id_acquisto: 0,
        token_carrello: [null],
        data_creazione_carrello: [null],
        data_inizio: [new Date()],
        data_fine: [new Date()],
        flag_ann: 0,
        id_valido: 0,
        note_record: ['string'],
        importo_lettini_aggiuntivi: 0,
        importo_residuo: 0,
        importo_abbonato: 0,
        importo_stabilimento: 0,
        importo_totale: 0,
        importo_lettino_aggiuntivo: 0
      }
    )
  }

  ngOnInit() {

    this.users$ = this.us.getGenericsListForSelect<any>()

    this.stabilimenti$ = this.us.getStabilimentiForUser(
      localStorage.getItem('userId')
    )
      .pipe(
        delay(500),
        map((data: OMBaseResponse<Stabilimento.Stabilimento[]>) => {
          this.form.get('selectedStabilimento').patchValue(data.payload[0].id);
          return data.payload;
        }),
        shareReplay()
      );

    const ombSub = this.stabilimenti$
      .pipe(
        concatMap((response) => {
          return this.ss.getOmbrelloniForStabilimento(response[0].id);
        }),
        map((data: OMBaseResponse<Stabilimento.Ombrellone[]>) => {
          data.payload.map((om: Stabilimento.Ombrellone) => {
            om.coord_x = this.correctValueChecker(om.coord_x);
            om.coord_y = this.correctValueChecker(om.coord_y);

            this.umbrellas.push(
              this.createUmbrella(om)
            );
            //this.selectedUmbrella = this.umbrellas.controls[0] as FormGroup;
            this.init = true;
          });
        }),

      ).subscribe()

    this.sink.add(ombSub);
  }

  createUser(): void {
    this.loading = true;
    this.us.postGenerics(this.userForm.value)
      .subscribe(ok => {
        this.loading = false;
      }, err => { this.loading = false });
  }

  createReservation(): void {
    this.loading = true;
    const payload = this.reservationForm.value;
    payload.id_stabilimento = this.form.get('selectedStabilimento').value;
    this.rs.postGenerics(this.reservationForm.value)
      .subscribe(ok => {
        this.loading = false;
      }, err => { this.loading = false });
  }

  showAddClientmodal(): void {
    console.log('invoked');
    this.addClient = true;
  }


}