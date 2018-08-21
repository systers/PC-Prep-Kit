import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit{
  public data;
  public language;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data, private _languageService: LanguageService) {
    this.data = data;
  }
  ngOnInit() {
    this._languageService.loadLanguage().subscribe(response => this.language = response.pcprepkit.common.badges)
  }
}
