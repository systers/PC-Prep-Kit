import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';
import { map, tap } from 'rxjs/operators';

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
  private _getJSONData = this._baseAPIUrl + 'getJSONData';

  // private _headers: HttpHeaders = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set('Accept', 'application/json')
  //   .set('x-access-token', localStorage.getItem(this._localStorageKey));

  constructor(private _http: HttpClient, private _apiservice: APIService) {
  }

  /**
   * Get user information from server
   * @return {Observable<any>} Return response
   */
  getUserInfo(): Observable<any> {
    return this._apiservice.get(this._getUserInfo).pipe(
      tap(res => console.log(' getUserInfo called ')),
      map(res => res)
    )
  }

  /**
   * Get mail policy from server
   * @return {Observable<any>} Return response
   */
  mailpcpolicy(): Observable<any> {
    return this._apiservice.get(this._mailPcPolicyInfo).pipe(
      tap(res => console.log(' mailpcpolicy called ')),
      map(res => res)
    )
  }

  /**
   * Get progress status from server
   * @return {Observable<any>} Return response
   */
  getProgressStatus(): Observable<any> {
    return this._apiservice.get(this._getProgressStatus).pipe(
      tap(res => console.log(' get ProgressStatus( ) called ')),
      map(res => res)
    )
  }

  // getProgressStatus(): Observable<any> {
  //   return this._http.get(this._getProgressStatus, {headers: this._headers});
  // }
  /**
   * Upload and camera  pic to server and save as profile picture
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  uploadCamPic(camData: Object): Observable<any> {
    return this._apiservice.post(this._uploadCamPic, camData).pipe(
      map(res => res)
    )

  }

  /**
   * Upload and camera pic to server and save as profile picture
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  uploadPic(formData: Object): Observable<any> {
    return this._apiservice.postFile(this._uploadPic, formData).pipe(
      map(res => res)
    )

  }

  getToken() {
    return localStorage.getItem(this._localStorageKey);
  }

  /**
   * Make update progress status request to server
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  updateProgressStatus(body: Object): Observable<any> {
    return this._apiservice.patch(this._updateProgressStatus, body).pipe(
      map(res => res)
    )
  }

  /**
   * Get JSON data from file stored on the server
   * @param  {String}          jsonFile Name of the JSON file containing the data
   * @return {Observable<any>}          Return response
   */
  getJSONData(jsonFile): Observable<any> {
    return this._apiservice.get(this._getJSONData + '?file=' + jsonFile).pipe(
      map(res => res)
    )
  }
}
