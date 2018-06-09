import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../../services/language.service';
import { SharedModule } from '../../shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { APIService } from '../../services/api.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { StopTheBreedComponent } from './stop-the-breed.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';

describe('StopTheBreedComponent', () => {
  let component: StopTheBreedComponent;
  let fixture: ComponentFixture<StopTheBreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StopTheBreedComponent],
      providers: [LanguageService, HttpClient, HttpHandler, ToastrService, APIService, DashboardService, SharedDataService],
      imports: [RouterTestingModule, ToastrModule.forRoot(), SharedModule, MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTheBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
