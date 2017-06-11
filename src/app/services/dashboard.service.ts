import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

    private _getUserInfo = environment.baseURL + environment.apiEndpoint + 'getUserInfo';

    constructor(private _http: Http, private _apiservice: APIService) { }

    // Get user info
    getUserInfo(): Observable<any> {
        return this._apiservice.get(this._getUserInfo)
                    .map(res => res.json());
    }
}
