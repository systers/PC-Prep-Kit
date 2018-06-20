import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private _updateAPI = environment.baseURL + environment.updateEndPoint;


  constructor(private _apiService: APIService) {
  }

  public updateUserDetails(body: Object): Observable<any> {
    return this._apiService.patch(this._updateAPI, body);
  }
}

