
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

    constructor(private _router: Router, private _authService: AuthService) {}

    canActivate(): Observable<boolean> | boolean {
        return this._authService.authenticated().pipe(
                    map(
                        result => {
                            if (!result.authenticated) {
                                return true;
                            } else {
                                this._router.navigate(['/menu']);
                                return false;
                            }
                        }),
                    catchError(error => {
                        return observableOf(true);
                    }), );
    }
}
