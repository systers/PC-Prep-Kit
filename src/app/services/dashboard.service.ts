import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

    private _localStorageKey = environment.localStorageKey;

    private _baseAPIUrl = environment.baseURL + environment.apiEndpoint;

    private _getUserInfo = this._baseAPIUrl + 'getUserInfo';
    private _mailPcPolicyInfo = this._baseAPIUrl + 'mailpcpolicy';
    private _getProgressStatus = this._baseAPIUrl + 'getProgressStatus';
    private _updateProgressStatus = this._baseAPIUrl + 'updateProgressStatus';
    private _uploadCamPic = this._baseAPIUrl + 'uploadCam';
    private _uploadPic = this._baseAPIUrl + 'upload';

    constructor(private _http: Http, private _apiservice: APIService) { }

    /**
     * Get user information from server
     * @return {Observable<any>} Return response
     */
    getUserInfo(): Observable<any> {
        return this._apiservice.get(this._getUserInfo)
                    .map(res => res.json());
    }

    /**
     * Get mail policy from server
     * @return {Observable<any>} Return response
     */
    mailpcpolicy(): Observable<any> {
        return this._apiservice.get(this._mailPcPolicyInfo)
                    .map(res => res.json());
    }

    /**
     * Get progress status from server
     * @return {Observable<any>} Return response
     */
    getProgressStatus(): Observable<any> {
        return this._apiservice.get(this._getProgressStatus)
                    .map(res => res.json());
    }

    /**
     * Upload and camera pic to server and save as profile picture
     * @param  {Object}          body Request body
     * @return {Observable<any>}      Return response
     */
    uploadCamPic(camData: Object): Observable<any> {
        return this._apiservice.post(this._uploadCamPic, camData)
                    .map(files => camData);
    }
    /**
     * Upload and camera pic to server and save as profile picture
     * @param  {Object}          body Request body
     * @return {Observable<any>}      Return response
     */
    uploadPic(formData: Object): Observable<any> {
        return this._apiservice.postFile(this._uploadPic, formData)
                    .map(res => res.json());
    }

    getToken() {
        return localStorage.getItem(this._localStorageKey);
    }
}
