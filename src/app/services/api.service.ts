import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class APIService {


  private _localStorageKey = environment.localStorageKey;


  constructor(private _http: HttpClient) {
  }

  /**
   * Perform GET request
   * @param  {string}          url URL of the API
   * @return {Observable<any>}     Return response
   */
  public get(url: string): Observable<any> {
    return this._http.get(url, {headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'x-access-token' : localStorage.getItem(this._localStorageKey) + ''}}).pipe(
      tap(res => console.log(' A GET request received')),
      map(data => data),
      catchError(this._handleError));
  }

  /**
   * Perform POST request
   * @param  {string}          url  URL of the API
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  public post(url: string, body: Object): Observable<any> {
    return this._http.post(url, body, {headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'x-access-token' : localStorage.getItem(this._localStorageKey) + ''}}).pipe(
      tap(res => console.log(' A POST request received')),
      map(data => data),
      catchError(this._handleError));
  }

  /**
   * Perform POST with a File request
   * @param  {string}          url  URL of the API
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  public postFile(url: string, body: Object): Observable<any> {
    // Need new header object for this API call
    return this._http.post(url, body, {headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'x-access-token' : localStorage.getItem(this._localStorageKey) + ''}}).pipe(
      map(data => data),
      catchError(this._handleError));
  }

  /**
   * Perform PUT request
   * @param  {string}          url  URL of the API
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  public put(url: string, body: Object): Observable<any> {

    return this._http.put(url, body, {headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'x-access-token' : localStorage.getItem(this._localStorageKey) + ''}}).pipe(
      map(data => data),
      catchError(this._handleError));
  }

  /**
   * Perform PATCH request
   * @param  {string}          url  URL of the API
   * @param  {Object}          body Request body
   * @return {Observable<any>}      Return response
   */
  public patch(url: string, body: Object): Observable<any> {

    return this._http.patch(url, body, {headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'x-access-token' : localStorage.getItem(this._localStorageKey) + ''}}).pipe(
      map(data => data),
      catchError(this._handleError));
  }

  /**
   * Generic error handle
   * @param {Response} error Response object
   */
  // More robust error handling
  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
