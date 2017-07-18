import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

    private _getUserInfo = environment.baseURL + environment.apiEndpoint + 'getUserInfo';
    private _mailPcPolicyInfo = environment.baseURL + environment.apiEndpoint + 'mailpcpolicy';
    private _getProgressStatus = environment.baseURL + environment.apiEndpoint + 'getProgressStatus';

    constructor(private _http: Http, private _apiservice: APIService) { }

    // Get user info
    getUserInfo(): Observable<any> {
        return this._apiservice.get(this._getUserInfo)
                    .map(res => res.json());
    }

    mailpcpolicy(): Observable<any> {
        return this._apiservice.get(this._mailPcPolicyInfo)
                    .map(res => res.json());
    }

   // Get progress status
    getProgressStatus(): Observable<any> {
        return this._apiservice.get(this._getProgressStatus)
                    .map(res => res.json());
    }

}
