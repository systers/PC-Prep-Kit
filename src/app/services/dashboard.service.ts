import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

    private _localStorageKey = environment.localStorageKey;

    private _getUserInfo = environment.baseURL + environment.apiEndpoint + 'getUserInfo';
    private _mailPcPolicyInfo = environment.baseURL + environment.apiEndpoint + 'mailpcpolicy';
    private _getProgressStatus = environment.baseURL + environment.apiEndpoint + 'getProgressStatus';
    private _updateProgressStatus = environment.baseURL + environment.apiEndpoint + 'updateProgressStatus';
    private _uploadCamPic = environment.baseURL + environment.apiEndpoint + 'uploadCam';
    private _uploadPic = environment.baseURL + environment.apiEndpoint + 'upload';

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
