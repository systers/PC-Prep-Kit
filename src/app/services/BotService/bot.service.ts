import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CustomResponse } from './CustomResponse';
import { Observable } from 'rxjs';

@Injectable()
export class BotService {
  private readonly _baseAPIURL = environment.rasaCoreBaseURL + environment.rasaCoreEndpoint;
  private readonly _userID = 'default';
  private readonly _parse = this._baseAPIURL + this._userID + '/parse';
  private readonly _respond = this._baseAPIURL + this._userID + '/respond';
  private readonly _continue = this._baseAPIURL + this._userID + '/continue';
  private readonly _tracker = this._baseAPIURL + this._userID + '/tracker';
  private readonly _events = this._tracker + '/events';

  private readonly _headers = new HttpHeaders().set('content-type', 'application/json');

  private response: string;
  constructor(private http: HttpClient) {}

  getIntent(query: string) {
    const body = {query: query};
    return this.http
      .post(this._parse, body, {headers: this._headers}).pipe(
        // @ts-ignore
        map(res => res.tracker.latest_message.intent.name)
      );
  }

  getResponse(query: string) {
    const body = {query: query};
    return this.http
      .post(this._respond, body, {headers: this._headers}).pipe(
        map(res => this.response = res[0].text),
        catchError(err => Observable.throwError(err))
      ).catch(err => Observable.throwError(err));
  }

  checkCustomIntent(intent: any) {
    return (CustomResponse.hasOwnProperty(intent))
  }

  getCustomResponse(intent: any) {
    return CustomResponse[intent];
  }
}

