import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbarService } from '../../services/navbar.service';
import { PcpolicyComponent } from './activity-2.component';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfokitComponent } from '../../infokit/infokit.component';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { MaterialModule } from '../../material.module';
import { LanguageService } from '../../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InfokitService } from '../../services/infokit.service';
import { SharedDataService } from '../../services/shared.data.service';

describe('PcpolicyComponent', () => {
  let component: PcpolicyComponent;
  let fixture: ComponentFixture<PcpolicyComponent>;
  let languageService: LanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        PcpolicyComponent,
        HeaderComponent,
        NavbarComponent,
        InfokitComponent,
        ButtonNavComponent
      ],
      providers: [
        DashboardService,
        APIService,
        AuthService,
        NavbarService,
        LanguageService,
        ToastrService,
        InfokitService,
        SharedDataService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpolicyComponent);
    component = fixture.componentInstance;
    languageService = TestBed.get(LanguageService);
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
