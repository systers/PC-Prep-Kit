import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

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
  private _getActivityLevel = this._baseAPIUrl + 'user/activity/levelNumber';
  private _updateActivityLevel = this._baseAPIUrl + 'user/activity/levelNumber/update';
  private _getActivityScore = this._baseAPIUrl + 'user/activity/score';
  private _updateActivityScore = this._baseAPIUrl + 'user/activity/score/update';


  constructor(private _http: HttpClient, private _apiservice: APIService) {
  }

  /**
   * Get user information from server
   * @return {Observable<any>} Return response
   */
  getUserInfo(): Observable<any> {
    return this._apiservice.get(this._getUserInfo).pipe(
      map(res => res)
    )
  }

  /**
   * Get mail policy from server
   * @return {Observable<any>} Return response
   */
  mailpcpolicy(): Observable<any> {
    return this._apiservice.get(this._mailPcPolicyInfo).pipe(
      map(res => res)
    )
  }

  /**
   * Get progress status from server
   * @return {Observable<any>} Return response
   */
  getProgressStatus(): Observable<any> {
    return this._apiservice.get(this._getProgressStatus).pipe(
      map(res => res)
    )
  }


  /**
   * Upload and camera  pic to server and save as profile picture
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  uploadCamPic(camData: Object): Observable<any> {
    return this._apiservice.post(this._uploadCamPic, camData).pipe(
      map(res => res),
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
      map(res => res),
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

  getActivityLevel(request): Observable<any> {
    return this._apiservice.post(this._getActivityLevel, request).pipe(
      map(res => res)
    )
  }

  updateActivityLevel(request): Observable<any> {
    return this._apiservice.patch(this._updateActivityLevel, request).pipe(
      map(res => res)
    )
  }

  getActivityScore(request): Observable<any> {
    return this._apiservice.post(this._getActivityScore, request).pipe(
      map(res => res)
    )
  }

  updateActivityScore(request): Observable<any> {
    return this._apiservice.patch(this._updateActivityScore, request).pipe(
      map(res => res)
    )
  }
}
