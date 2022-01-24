

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OMBaseResponse } from '../interfaces/om-base-response';
import { Stabilimento } from '../interfaces/stabilimento';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

    namespace: string = 'user';

    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) {
        super(http, ms);
    }

    getStabilimentiForUser(userId: string): Observable<OMBaseResponse<Stabilimento.Stabilimento[]>> {
        return this.http.get<OMBaseResponse<Stabilimento.Stabilimento[]>>(`${this.BASE_PATH}/${this.namespace}/${userId}/stabilimento`);
    }

}