import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.component.html',
  styleUrls: ['./prevention.component.scss']
})
export class PreventionComponent implements OnInit {
  language: any;

  constructor(private _langService: LanguageService) {
  }

  ngOnInit() {
    this._langService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.stages.prevention;
    });
  }

}
