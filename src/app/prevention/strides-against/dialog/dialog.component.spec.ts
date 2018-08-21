import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material.module';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '../../../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../../../services/api.service';


describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MaterialModule, MatDialogModule],
      providers: [{
        provide: MatDialogRef, useValue: {}
      },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }, LanguageService, HttpClient, HttpHandler, APIService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

