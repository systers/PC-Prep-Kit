import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

    constructor(private _router: Router, private _authService: AuthService) {}

    canActivate(): Observable<boolean> | boolean {
        return this._authService.authenticated()
                    .map(
                        result => {
                            if (!result.authenticated) {
                                return true;
                            } else {
                                this._router.navigate(['/home']);
                                return false;
                            }
                        })
                    .catch(error => {
                        return Observable.of(true);
                    });
    }
}
