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
export class StabilimentiService extends BaseService {

    namespace = 'stabilimento';
    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) {
        super(http, ms);
    }

    getStabilimenti(): Observable<OMBaseResponse<Stabilimento.Stabilimento[]>> {
        return this.http.get<OMBaseResponse<Stabilimento.Stabilimento[]>>(`${this.BASE_PATH}/${this.namespace}`);
    }

    getStabilimento(id: number | string): Observable<OMBaseResponse<Stabilimento.Stabilimento>> {
        return this.http.get<OMBaseResponse<Stabilimento.Stabilimento>>(`${this.BASE_PATH}/${this.namespace}/${id}`);
    }

    getOmbrelloniForStabilimento(stabilimentoId: number): Observable<OMBaseResponse<Stabilimento.Ombrellone[]>> {
        return this.http.get<any>(`${this.BASE_PATH}/${this.namespace}/${stabilimentoId}/ombrellone`)
    }
}
