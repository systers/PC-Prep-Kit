import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {APIService} from './api.service';
import 'rxjs/Rx';

@Injectable()
export class InfokitService {
    public _baseAPIUrl = environment.baseURL + environment.apiEndpoint;
    private _getInfokitActive = this._baseAPIUrl + 'infokitactive';
    private _activateInfokit = this._baseAPIUrl + 'activateinfokit';
    constructor(private _http: HttpClient, private _apiservice: APIService) { }

    // Get user info
    infokitactive(): Observable<any> {
        return this._apiservice.get(this._getInfokitActive);
    }

    activateinfokit(path): Observable<any> {
        return this._apiservice.get(this._activateInfokit + '?activate=' + path );
    }
}
