import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class ReservationService extends BaseService {

    namespace = 'prenotazione';
    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) {
        super(http, ms);
    }

}