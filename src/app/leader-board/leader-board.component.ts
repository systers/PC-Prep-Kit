import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  public image: string;
  public badgeName: string;
  public data: any;
  public language: any;
  public userEmail: any;

  constructor(private dialogRef: MatDialogRef<LeaderBoardComponent>, @Inject(MAT_DIALOG_DATA) data, private languageService: LanguageService) {
    this.image = data.badge.image;
    this.data = data.leaderBoardData;
    this.badgeName = data.badge.name;
    this.userEmail = data.userEmail;
  }

  ngOnInit() {
    this.languageService.loadLanguage().subscribe(res => this.language = res.pcprepkit.common.leaderBoard.headings);
  }

  close() {
    this.dialogRef.close();
  }

  checkCurrentUser(userEmail): boolean {
    return userEmail === this.userEmail;
  }
}

