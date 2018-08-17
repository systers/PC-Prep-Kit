import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Sources } from './sources';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {
  public language: any;
  public Sources = Sources;

  constructor(private _languageService: LanguageService) { }

  ngOnInit() {
    this._languageService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.disclaimer;
    });
  }

}

