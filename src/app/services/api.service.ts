import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class APIService {

    private _headers: Headers;
    private _localStorageKey = 'pcprepkitUser';

    constructor(private _http: Http) {}

    private _setHeaders() {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Accept', 'application/json');
        const token = localStorage.getItem(this._localStorageKey);
        if (token) {
            this._headers.append('x-access-token', token);
        }
    }

    public get(url: string): Observable<any> {
        this._setHeaders();
        return this._http.get(url, { headers: this._headers })
                    .catch(this._handleError);
    }

    public post(url: string, body: Object): Observable<any> {
        this._setHeaders();
        return this._http.post(url, body, { headers: this._headers })
                    .catch(this._handleError);
    }

    public put(url: string, body: Object): Observable<any> {
        this._setHeaders();
        return this._http.put(url, body, { headers: this._headers })
                    .catch(this._handleError);
    }

    private _handleError(error: Response) {
        const details = error.json();
        return Observable.throw(details);
    }
}

