import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NavbarService } from '../services/navbar.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  public data: any;
  public language: any;

  constructor(private dialogRef: MatDialogRef<CertificateComponent>, @Inject(MAT_DIALOG_DATA) DATA, private _languageService: LanguageService) {
    this.data = DATA;
    this._languageService.loadLanguage().subscribe( response => this.language = response.pcprepkit.certificate);
  }

  ngOnInit() {
  }
  print() {
    window.print();
  }
}

@Injectable()
export class CertificateService {
  constructor(private _certificate: MatDialog, private _navbarService: NavbarService) {
  }

   openCertificate(): void {
    this._navbarService.getUserName().subscribe(res => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {name: res.username};
      dialogConfig.panelClass = 'certificateClass';
      dialogConfig.backdropClass = 'certificateBackdrop';
      dialogConfig.disableClose = true;
      // dialogConfig.height = '600px';
      dialogConfig.width = '1000px';
      dialogConfig.height = '650px';

      const dialogRef = this._certificate.open(CertificateComponent, dialogConfig);
    })
  }
}
