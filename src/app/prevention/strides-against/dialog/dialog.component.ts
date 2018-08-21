import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LanguageService } from '../../../services/language.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public answer: boolean;
  public language: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _languageService: LanguageService
  ) {
  }

  setTrue(): void {
    this.answer = true;
  }

  setFalse(): void {
    this.answer = false;
  }

  save(): void {
    this.dialogRef.close(this.answer);
  }
  ngOnInit() {
    this._languageService.loadLanguage().subscribe( res => this.language = res.pcprepkit.stages.prevention.stridesAgainst.game.alerts.question.response);
  }

}


