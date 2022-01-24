import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, filter, skip, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Platform, ToastController } from '@ionic/angular';
@Injectable()
export class OMInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    platform: 'android' | 'ios';

    constructor(
        private router: Router,
        private p: Platform,
        private tc: ToastController
    ) {
        this.platform = this.p.is('ios') ? 'ios' : 'android';
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        const refreshToken = token;

        request = this.addHeaders(request, token);

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.log(request.headers);

                    throw new Error('Errore 401');
                } else {
                    if (!request.headers.has('skipmessage')) {
                        this.showToast(err.error.desc);
                    }
                }
                // devo restituire uno stream, pertanto devo wrappare
                // l'errore in un throwError
                return throwError(err);
            }) as any
        );

    }

    private async showToast(message: string) {
        const t = await this.tc.create({
            header: 'Errore',
            message,
            color: 'danger',
            duration: 3000
        });
        t.present();
    }

    private addHeaders(
        originalReq: HttpRequest<any>,
        accessTokenToApply: string
    ): HttpRequest<any> {


        const somatolineHeaders: any = {
            Authorization: localStorage.getItem('token'),
        };

        if (accessTokenToApply) {
            somatolineHeaders.Authorization = `Bearer ${accessTokenToApply}`;
        }

        const req = originalReq.clone({
            setHeaders: somatolineHeaders
        });
        return req;
    }


}
