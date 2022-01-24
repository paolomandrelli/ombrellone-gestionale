import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OMBaseResponse } from '../interfaces/om-base-response';
import { Stabilimento } from '../interfaces/stabilimento';
import { BaseService } from './base-service';


@Injectable({
    providedIn: 'root'
})
export class OmbrelloneService extends BaseService {

    namespace = 'ombrellone';
    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) {
        super(http, ms);
    }

    postOmbrellone(ombrellone: Stabilimento.Ombrellone): Observable<OMBaseResponse<Stabilimento.Ombrellone>> {
        return this.http.post<OMBaseResponse<Stabilimento.Ombrellone>>(`${this.BASE_PATH}/${this.namespace}`, ombrellone)
    }

    getOmbrelloni(): Observable<any> {
        return this.http.get<any>(`${this.BASE_PATH}/${this.namespace}`)
            .pipe(
                catchError(err => {

                    return err;
                })
            );
    }

    saveOmbrelloni(omb): Observable<any> {
        return this.http.patch<any>(`${this.BASE_PATH}/${this.namespace}/${omb.id}`, omb)
    }
}
