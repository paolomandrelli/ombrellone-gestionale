import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OMAuth } from '../interfaces/om-auth';
import { OMBaseResponse } from '../interfaces/om-base-response';
import { BaseService } from './base-service';
import jwt_decode from "jwt-decode";
import { OMUser } from '../interfaces/om-user';



@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    namespace = 'auth';

    /**
     * Dove risiede l'utente, viene popolato alla login.
     */
    user$ = new BehaviorSubject<OMUser>(null);

    constructor(
        protected http: HttpClient,
        protected ms: MessageService
    ) {
        super(http, ms);
    }

    login(payload: OMAuth.LoginRequest): Observable<OMAuth.LoginResponse> {
        return this.http.post<OMAuth.LoginResponse>(`${this.BASE_PATH}/${this.namespace}/login`, payload)
            .pipe(
                map(d => {
                    var decoded = jwt_decode(d.token);
                    console.log(decoded);
                    this.user$.next(d.user);
                    return d;
                }),
                catchError(err => {
                    this.showMessage('Operazione non riuscita', 'Email e\/o password non corretti', 'error')
                    return throwError(err);
                })
            );
    }

    test(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }

    testPost(): Observable<any> {
        return this.http.post('https://jsonplaceholder.typicode.com/posts', {});
    }
}

