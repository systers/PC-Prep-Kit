import { Observable, of as observableOf } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {};

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.authenticated().pipe(
                    map(
                        result => {
                            if (result.authenticated) {
                                return true;
                            }
                            this.router.navigate(['/login']);
                            return false;
                        }),
                    catchError(error => {
                        this.router.navigate(['/login']);
                        return observableOf(false);
                    }), );
    }
}
