import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class NavbarService {

    private _getUsername = environment.baseURL + environment.apiEndpoint + 'username';

    constructor(private _http: HttpClient, private _apiservice: APIService) { }

    // Get user info
    getUserName(): Observable<any> {
        return this._apiservice.get(this._getUsername);

    }
}
