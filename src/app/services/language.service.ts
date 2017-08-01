import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class LanguageService {

    private _languageFile = '../assets/languages/english.json';

    constructor(private _http: Http, private _apiservice: APIService) { }

    loadLanguage(): Observable<any> {
        return this._apiservice.get(this._languageFile)
                    .map(res => res.json());
    }
}
