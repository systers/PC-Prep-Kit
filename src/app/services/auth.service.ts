import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { APIService } from './api.service';

@Injectable()
export class AuthService {

    private static _localStorageKey = 'pcprepkitUser';
    private _token: string = null;
    private _user: object = null;

    // Routes
    private _loginAuth = environment.baseURL + environment.authEndpoint + 'login';
    private _logoutAuth = environment.baseURL + environment.authEndpoint  + 'logout';
    private _authenticatedApi = environment.baseURL + environment.authEndpoint  + 'authenticated';
    private _forgotPasswordApi = environment.baseURL + environment.authEndpoint  + 'forgot';
    private _resetPasswordApi = environment.baseURL + environment.authEndpoint  + 'reset/';

    constructor(private _router: Router, private _apiservice: APIService) {
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

        return this._apiservice.post(this._loginAuth, body)
                    .map((res: Response) => {
                        const json = res.json();
                        if (json.info) {
                            throw res;
                        }
                        if (!json.token) {
                            return false;
                        }
                        localStorage.setItem(AuthService._localStorageKey, JSON.stringify(json.token));
                        this._user = json.user;
                        this._token = json.token;
                        return true;
                    })
                    .catch((err: Response) => {
                        // To catch the exception thrown
                        const details = err.json();
                        return Observable.throw(details);
                    });
    }

    public resetPassword (body: Object): Observable<any> {

        return this._apiservice.post(this._forgotPasswordApi, body)
                            .map((res: Response) => {
                                return res.json();
                            });
    }

    public updatePassword (body: Object, token): Observable<any> {

        return this._apiservice.put(this._resetPasswordApi + token, body)
                        .map((res: Response) => {
                            return res.json();
                        });
    }

    public authenticated() {
        return this._apiservice.get(this._authenticatedApi)
                    .map((res: Response) => {
                        const json = res.json();
                        if (!json.token) {
                            return false;
                        }
                        localStorage.setItem(AuthService._localStorageKey, JSON.stringify(json.token));
                        this._user = json.user;
                        this._token = json.token;
                        return json;
                    });
    }


    public logout() {
        localStorage.removeItem(AuthService._localStorageKey);
        this._user = null;
        this._token = null;
        return this._apiservice.get(this._logoutAuth)
                    .map((res: Response) => res.json());
    }

}
