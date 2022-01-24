import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { concatMap, debounceTime, delay, map, shareReplay, switchMap } from 'rxjs/operators';
import { OMBaseResponse } from '../interfaces/om-base-response';
import { Stabilimento } from '../interfaces/stabilimento';
import { OmbrelloneService } from '../services/ombrellone.service';
import { StabilimentiService } from '../services/resorts.service';
import { UserService } from '../services/user.service';
import { BeachBaseClass } from '../shared/beach-base-class';

@Component({
  selector: 'app-beach-editor',
  templateUrl: './beach-editor.page.html',
  styleUrls: ['./beach-editor.page.scss'],
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
export class BeachEditorPage extends BeachBaseClass implements OnInit {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);

    const keysToPrevent = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

    const selectedUmbrella = this.umbrellas.controls.find(c => c.value.selected);
    if (selectedUmbrella && keysToPrevent.includes(event.key)) {

      const { coord_x, coord_y } = selectedUmbrella.value;

      event.preventDefault();
      switch (event.key) {
        case 'ArrowDown':
          selectedUmbrella.patchValue({ coord_y: coord_y + .5 });
          break;
        case 'ArrowUp':
          selectedUmbrella.patchValue({ coord_y: coord_y - .5 });
          break;
        case 'ArrowLeft':
          selectedUmbrella.patchValue({ coord_x: coord_x - .5 });
          break;
        case 'ArrowRight':
          selectedUmbrella.patchValue({ coord_x: coord_x + .5 });
          break;
      }
    }
  }

  constructor(
    protected fb: FormBuilder,
    protected os: OmbrelloneService,
    protected us: UserService,
    protected ss: StabilimentiService
  ) {
    super(fb, os, us, ss);
    this.form = this.fb.group({
      selectedStabilimento: [],
      umbrellas: this.fb.array([])
    });
  }

  ngOnInit() {

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
            // this.selectedUmbrella = this.umbrellas.controls[0] as FormGroup;
            this.init = true;
          });
        }),

      ).subscribe()

    this.sink.add(ombSub);
  }

  increaseScaleSize(): void {
    this.scaleSize += 0.1;
  }


  decreaseScaleSize(): void {
    this.scaleSize -= 0.1;
  }

  placeNewUmbrella($event: DragEvent): void {

  }

  addUmbrellaAtZeroZero(): void {

    this.os.postOmbrellone({
      coord_y: this.map.nativeElement.offsetTop,
      coord_x: this.map.nativeElement.offsetLeft,
      id_stabilimento: this.form.get('selectedStabilimento').value,
      ombrellone_tipi_id: 0,
      num_max_lettini_aggiuntivi: 0,
      numero_fila: 0,
      numero_lettini: 0,
      numero_riga: 0,
      id: 0,
      descrizione: '',
      data_creazione: '',
      data_modifica: '',
      flag_ann: 0,
      id_valido: 1,
      note_record: ''
    })
      .subscribe(ok => {
        this.umbrellas.push(
          this.createUmbrella()
        );

      })
  }

  moveUmbrella($event: DragEvent, umbrella: AbstractControl): void {

    console.log($event);
    const dropPointY = $event.offsetY;
    const dropPointX = $event.x - 30;

    const map = this.map.nativeElement;

    const mapWidth = map.clientWidth;
    const mapHeight = map.children[2].clientHeight;

    const mapTop = this.map.nativeElement.offsetTop;
    const droppedPointX = dropPointX;
    const droppedPointY = dropPointY + mapTop;

    // mapWidth / droppedPointX = 100 / x
    // droppedX / mapWidth = x / 100
    // 

    const newPercentageX = (droppedPointX * 100) / mapWidth;
    const newPercentageY = (droppedPointY * 100) / mapHeight;



    umbrella.patchValue({
      coord_x: newPercentageX,
      coord_y: newPercentageY,
    });

  }

  write($event, fg: FormGroup): void {
    console.log('$event', fg);
    fg.get('descrizione').markAsDirty();
    const currValue = fg.get('descrizione').value;
    if ($event.key === 'Backspace') {
      fg.get('descrizione').patchValue(currValue.slice(0, -1));
    } else {
      fg.get('descrizione').patchValue(currValue + $event.key);
    }
  }


  get umbrellas(): FormArray {
    return this.form.get('umbrellas') as FormArray;
  }

}
