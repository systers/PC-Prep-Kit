import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class NavbarService {

    private _getUsername = environment.baseURL + environment.apiEndpoint + 'username';
    private _getUserInfo = environment.baseURL + environment.apiEndpoint + 'getUserInfo';

    constructor(private _http: HttpClient, private _apiservice: APIService) { }

    // Get user info
    getUserName(): Observable<any> {
        return this._apiservice.get(this._getUsername);

    }
    getUserInfo(): Observable<any> {
        return this._apiservice.get(this._getUserInfo).pipe(
          map(res => res)
        )
    }
}
