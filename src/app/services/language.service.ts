import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class LanguageService {

    private _languageFile = '../assets/languages/english.json';

    constructor(private _http: HttpClient, private _apiservice: APIService) { }

    loadLanguage(): Observable<any> {
        return this._apiservice.get(this._languageFile);
    }
}
