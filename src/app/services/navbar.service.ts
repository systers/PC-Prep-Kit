import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class NavbarService {

    private _getUsername = environment.baseURL + environment.apiEndpoint + 'username';

    constructor(private _http: Http, private _apiservice: APIService) { }

    // Get user info
    getUserName(): Observable<any> {
        return this._apiservice.get(this._getUsername)
                    .map(res => res.json());
    }
}
