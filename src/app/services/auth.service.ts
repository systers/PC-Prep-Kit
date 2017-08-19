import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { APIService } from './api.service';

@Injectable()
export class AuthService {

    private static _localStorageKey = environment.localStorageKey;
    private _token: string = null;
    private _user: object = null;

    private _baseAuthUrl = environment.baseURL + environment.authEndpoint;
    // Routes
    private _loginAuth = this._baseAuthUrl + 'login';
    private _logoutAuth = this._baseAuthUrl + 'logout';
    private _authenticatedApi = this._baseAuthUrl + 'authenticated';
    private _forgotPasswordApi = this._baseAuthUrl + 'forgot';
    private _resetPasswordApi = this._baseAuthUrl + 'reset/';

    constructor(private _router: Router, private _apiservice: APIService) {
        const currentUser = JSON.parse(localStorage.getItem(AuthService._localStorageKey));
        if (currentUser && currentUser.user && currentUser.token) {
            this._user = currentUser.user;
            this._token = currentUser.token;
        } else {
            localStorage.removeItem(AuthService._localStorageKey);
        }
    }

    /**
     * Make user login request to server
     * @param  {Object}          body Request body
     * @return {Observable<any>}      Return response
     */
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

    /**
     * Make reset password request to server
     * @param  {Object}          body Request body
     * @return {Observable<any>}      Return response
     */
    public resetPassword (body: Object): Observable<any> {

        return this._apiservice.post(this._forgotPasswordApi, body)
                            .map((res: Response) => {
                                return res.json();
                            });
    }

    /**
     * Make password update to server
     * @param  {Object}          body  [description]
     * @param  {[type]}          token [description]
     * @return {Observable<any>}       [description]
     */
    public updatePassword (body: Object, token): Observable<any> {

        return this._apiservice.put(this._resetPasswordApi + token, body)
                        .map((res: Response) => {
                            return res.json();
                        });
    }

    /**
     * Get authentication token
     */
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

    /**
     * Perform logout (Clear session)
     */
    public logout() {
        localStorage.removeItem(AuthService._localStorageKey);
        this._user = null;
        this._token = null;
        return this._apiservice.get(this._logoutAuth)
                    .map((res: Response) => res.json());
    }

}
