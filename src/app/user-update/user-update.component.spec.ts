import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUpdateComponent } from './user-update.component';
import { LanguageService } from '../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('User Update Component', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let dashboardService: DashboardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpdateComponent],
      providers: [LanguageService, HttpClient, HttpHandler, APIService,
        DashboardService, SharedDataService, ToastrService, {
          provide: MAT_DIALOG_DATA,
          useValue: {username: 'FirstName LastName'}
        }, {provide: MatDialogRef, useValue: {}}],
      imports: [ToastrModule.forRoot(), ReactiveFormsModule, RouterTestingModule, MatDialogModule,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it(' Checking updating part', () => {
    let fname = component.updateForm.controls['firstName'];
    let lname = component.updateForm.controls['lastName'];
    fname.setValue('test1');
    lname.setValue('test2');

    let el = fixture.debugElement.query(By.css('button[type=submit]'));
    el.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      dashboardService.getUserInfo().subscribe(res => {
        let username = res.username;
        expect(username).toEqual(fname + '' + lname);
      })
    });
  })
});


