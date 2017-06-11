import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(private router: Router, private authService: AuthService) {};

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.authenticated()
					.map(
						result => {
							if (result.authenticated) {
								return true;
							} 
							this.router.navigate(['/login']);
							return false;
						})
					.catch(error => {
						this.router.navigate(['/login']);
						return Observable.of(false);
					});
	}
}
	


