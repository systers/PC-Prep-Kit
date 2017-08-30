import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class InfokitService {
    public _baseAPIUrl = environment.baseURL + environment.apiEndpoint;
    private _getInfokitActive = this._baseAPIUrl + 'infokitactive';
    private _activateInfokit = this._baseAPIUrl + 'activateinfokit';
    constructor(private _http: Http, private _apiservice: APIService) { }

    // Get user info
    infokitactive(): Observable<any> {
        return this._apiservice.get(this._getInfokitActive)
                    .map(res => res.json());
    }

    activateinfokit(path): Observable<any> {
        return this._apiservice.get(this._activateInfokit + '?activate=' + path )
                    .map(res => res.json());
    }
}
