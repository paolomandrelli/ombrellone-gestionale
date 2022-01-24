import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class MustGoToMainGuard implements CanActivate {
    constructor(
        private r: Router
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): UrlTree {
        return this.r.createUrlTree([`/dashboard/main`]);
    }
}