
import { Directive, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { OMBaseClass } from '../base-classes/om-base-class';
import { Stabilimento } from '../interfaces/stabilimento';
import { OmbrelloneService } from '../services/ombrellone.service';
import { StabilimentiService } from '../services/resorts.service';
import { UserService } from '../services/user.service';

@Directive()
export class BeachBaseClass extends OMBaseClass {

    scaleSize = 1;

    form: FormGroup;

    selectedUmbrella: FormGroup;

    sink = new Subscription();

    loading = false;

    stabilimenti$: Observable<Stabilimento.Stabilimento[]>;

    init = false;

    @ViewChild('map') map: ElementRef;
    constructor(
        protected fb: FormBuilder,
        protected os: OmbrelloneService,
        protected us: UserService,
        protected ss: StabilimentiService
    ) {
        super();
    }

    selectUmbrella(umbrella: AbstractControl): void {
        // this.delesectAll()

        const currentValue = umbrella.get('selected').value;
        umbrella.get('selected').patchValue(!currentValue, { emitEvent: false });


        setTimeout(() => {

            this.selectedUmbrella = this.umbrellas.controls.find(u => {
                return u.get('selected').value ? u : null;
            }) as FormGroup;
        })
    }

    protected correctValueChecker(coord: number): number {
        if (coord < 0) {
            coord = 0;
        }

        if (!coord) {
            coord = 0;
        }
        return coord;
    }

    protected createUmbrella(om?: Stabilimento.Ombrellone): FormGroup {


        const fg = this.fb.group({
            coord_y: [this.map.nativeElement.offsetTop],
            coord_x: [this.map.nativeElement.offsetLeft],
            id_stabilimento: [1],
            ombrellone_tipi_id: [0],
            selected: [false],
            num_max_lettini_aggiuntivi: [0],
            id: [om.id],
            numero_fila: [0],
            numero_lettini: [0],
            numero_riga: [0],
            descrizione: ['', [Validators.required, Validators.maxLength(10)]]
        });

        if (om) {
            fg.patchValue(om);
        }

        const fgSub = fg.valueChanges
            .pipe(
                debounceTime(1000),
                switchMap((newVal: Stabilimento.Ombrellone) => {

                    return this.os.saveOmbrelloni(newVal)
                })
            )
            .subscribe((finalResponse: Stabilimento.Ombrellone) => {

                console.log({
                    finalResponse
                })


            });

        // this.sink.add(fgSub);


        return fg;
    }


    public deselectAll(): void {
        this.umbrellas.controls.map(u => {
            u.get('selected').patchValue(false);
        });
    }


    get umbrellas(): FormArray {
        return this.form.get('umbrellas') as FormArray;
    }


}