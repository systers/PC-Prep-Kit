import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

	private static _localStorageKey = 'pcprepkitUser';
	private _token: string = null; 
	private _user: object = null;

	// Routes
	private _loginAuth = environment.baseURL + environment.authEndpoint +'login';
	private _logoutAuth = environment.baseURL + environment.authEndpoint  + 'logout';
	private _authenticatedApi = environment.baseURL + environment.authEndpoint  + 'authenticated';
	private _forgotPasswordApi = environment.baseURL + environment.authEndpoint  + 'forgot';	
	private _resetPasswordApi = environment.baseURL + environment.authEndpoint  + 'reset/';		

	constructor(private _http: Http, private _router: Router) {
	    const currentUser = JSON.parse(localStorage.getItem(AuthService._localStorageKey));
	    if (currentUser && currentUser.user && currentUser.token) {
			this._user = currentUser.user;
			this._token = currentUser.token;
	    } else {
			localStorage.removeItem(AuthService._localStorageKey);
	    }
	}

	public loginUser (body: Object): Observable<any> {
		this.logout();
	    let bodyString = JSON.stringify(body); 
	    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
	    let options       = new RequestOptions({ headers: headers }); 

	    return this._http.post(this._loginAuth, body, options) 
					.map((res:Response) => {
						const json = res.json();
				        if (!json.token) {
							return false;
				        }
						localStorage.setItem(AuthService._localStorageKey, JSON.stringify(json.token));
						this._user = json.user;
						this._token = json.token;
						return true;
					})	 
					.do((succeeded: boolean): void => {
						if (succeeded) {
							this._router.navigateByUrl('/');
						}
					})					 
					.catch((err:Response) => {
						this.logout();
						let details = err.json();
						return Observable.throw(details);
					});              
	}

	public resetPassword (body: Object): Observable<any> {
		let bodyString = JSON.stringify(body); // Stringify payload
		let headers      = new Headers({ 'Content-Type': 'application/json' }); 
		let options       = new RequestOptions({ headers: headers }); 

		return this._http.post(this._forgotPasswordApi, body, options) 
							.map((res:Response) => {
								return res.json();
							})
							.catch((err:Response) => {
								let details = err.json();
								return Observable.throw(details);
							});  		
	}  

	public updatePassword (body: Object, token): Observable<any> {
		let bodyString = JSON.stringify(body); // Stringify payload
		let headers      = new Headers({ 'Content-Type': 'application/json' }); 
		let options       = new RequestOptions({ headers: headers });

		return this._http.post(this._resetPasswordApi + token, body, options) 
						.map((res:Response) => {
							return res.json();
						})
						.catch((err:Response) => {
							let details = err.json();
							return Observable.throw(details);
						});
	}

  	public authenticated() {
		return this._http.get(this._authenticatedApi)
					.map((res: Response) => {
						const json = res.json();
						if (!json.token) {
							return false;
						}
						localStorage.setItem(AuthService._localStorageKey, JSON.stringify(json.token));
						this._user = json.user;
						this._token = json.token;
						return json;
					})
					.catch((err:Response) => {
						let details = err.json();
						return Observable.throw(details);
					});
	}


	public logout() {
		localStorage.removeItem(AuthService._localStorageKey);
		this._user = null;
		this._token = null;	
		return this._http.get(this._logoutAuth)
					.map((res: Response) => res.json())
					.catch((err:Response) => {
						let details = err.json();
						return Observable.throw(details);
					});
	}  	

}
