import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class MenuBtnService {
    triggerMenuBtn$ = new BehaviorSubject<boolean>(false);

    trigger(bool: boolean): void {
        this.triggerMenuBtn$.next(bool);
    }
}