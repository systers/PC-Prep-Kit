import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { APIService } from '../api.service';
import 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BadgeConfig } from '../../badge/Config';
import { Badge } from '../../badge/models/badgeModel';
import { NotifyService } from '../../badge/notify';

@Injectable()

export class BadgeService {

  private _baseAPIUrl = environment.baseURL + environment.apiEndpoint;
  private _getUserBadge = this._baseAPIUrl + 'user/badge';
  private _updateUserBadge = this._baseAPIUrl + 'user/badge/update';


  constructor(private _apiService: APIService, private _notify: NotifyService) {
  }

  getBadge(): Observable<Badge> {
    return this._apiService.get(this._getUserBadge).pipe(
      map(response => BadgeConfig[response.badge])
    )
  }

  getBadgeNumber(): Observable<number> {
    return this._apiService.get(this._getUserBadge).pipe(
      map(response => response.badge)
    )
  }

  updateBadgeNumber(newBadge: number): Observable<any> {
    return this._apiService.patch(this._updateUserBadge, {badge: newBadge}).pipe(
      map(res => this._notify.notifyOther(true)),
      tap(res => res),
      catchError(err => Observable.throwError(err))
    ).catch(err => Observable.throwError(err))
  }
}

