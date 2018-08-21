import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LeaderBoardComponent } from '../leader-board/leader-board.component';
import { ActivityPoints } from '../leader-board/PointsConfig';

@Injectable()

export class LeaderBoardService {

  private _baseAPIUrl = environment.baseURL + environment.apiEndpoint;
  private _getLeaderBoard = this._baseAPIUrl + 'leaderBoard';
  private _getScore = this._baseAPIUrl + 'user/score';
  private _updateScore = this._baseAPIUrl + 'user/score/update';
  private readonly DIALOG_MINIMUM_WIDTH = '700px';


  constructor(private _apiService: APIService, private _dialog: MatDialog) {
  }

  getLeaderBoardData(badge: number): Observable<any> {
    return this._apiService.post(this._getLeaderBoard, {badge: badge}).pipe(
      map(response => response)
    )
  }

  showLeaderBoard(data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = this.DIALOG_MINIMUM_WIDTH;
    dialogConfig.panelClass = 'leaderBoardClass';
    const dialogRef = this._dialog.open(LeaderBoardComponent, dialogConfig);
  }

  updateLeaderBoard(data): void {
    this._apiService.get(this._getScore).subscribe(response => {
      let updatedPoints: number;
      if (data.hasOwnProperty('score')) {
        // That is, when there is dynamic points and not threshold points like for levels
        updatedPoints = response.score - data.prevScore + data.score;
      } else {
        const currentPoints = response.score;
        const activity = data.activity;
        const level = data.level;
        const points = (ActivityPoints[activity])[level];
        updatedPoints = currentPoints + points;
      }
      this._apiService.patch(this._updateScore, {score: updatedPoints}).subscribe(res => res);
    })
  }
}

