import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../services/language.service';
import { APIService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarService } from '../services/navbar.service';
import { MatDialogModule } from '@angular/material';
import { CertificateService } from './certificate.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CertificateComponent } from './certificate.component';
import { MatDialogRef } from '@angular/material';
import { MaterialModule } from '../material.module';


describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule],
      providers: [NavbarService, CertificateService, {
        provide: MAT_DIALOG_DATA, useValue: {name: 'testName'}
      },
        APIService, {provide: MatDialogRef, useValue: {}}, LanguageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should initiate the badge component successfully with user\'s name', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.data.name).toEqual('testName');
  });
});
