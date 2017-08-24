import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { APIService } from './api.service';

@Injectable()
export class DoctorService {

    // Routes
    private _doctorChat = environment.baseURL + environment.apiEndpoint + 'doctorchat';

    constructor(private _apiservice: APIService) {}

    public doctorMessage(body: Object): Observable<any> {
        return this._apiservice.post(this._doctorChat, body)
                            .map((res: Response) => {
                                return res.json();
                            });
    }
}
