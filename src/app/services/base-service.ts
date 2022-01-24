import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SelectItem } from 'primeng/api';
import { OMBaseResponse } from '../interfaces/om-base-response';
type MessageSeverities = 'success' | 'info' | 'warn' | 'custom' | 'error';

export abstract class BaseService {

    abstract namespace: string;
    BASE_PATH = environment.DOMAIN_WITHOUTH_SLASH;


    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) { }

    postGenerics<T>(payload: T): Observable<OMBaseResponse<T>> {
        return this.http.post<OMBaseResponse<T>>(`${this.BASE_PATH}/${this.namespace}`, payload);
    }

    getGenericsList<T>(): Observable<T[]> {
        return this.http.get<T[]>(`${this.BASE_PATH}/${this.namespace}`).pipe(

        );
    }

    getGenericsListForSelect<T>(): Observable<SelectItem<T>[]> {
        return this.http.get<OMBaseResponse<T[]>>(`${this.BASE_PATH}/${this.namespace}`).pipe(
            map((d) => {
                const selectItems = d.payload.map((d) => {
                    return {
                        value: d['id'],
                        label: d['nome']
                    }
                })
                return [{
                    label: '-',
                    value: null
                }].concat(selectItems);
            }),
            catchError(e => {
                console.log(e);
                throw new Error('Errore http');
            })
        );
    }

    showMessage(
        summary: string,
        detail: string,
        severity: MessageSeverities = 'custom',
        life: number = 3000,
        sticky: boolean = false,
        icon?: string,
    ): void {
        this.ms.add({
            summary,
            detail,
            severity,
            life,
            sticky,
            icon
        });
    }
}