import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { APIService } from './api.service';

@Injectable()
export class RegService {

    // Routes
    private _regApi = environment.baseURL + environment.regEndPoint;

    constructor(private _apiservice: APIService) {
    }

    public registerUser(body: Object): Observable<any> {

        return this._apiservice.post(this._regApi, body);
    }
}
