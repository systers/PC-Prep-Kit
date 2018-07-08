import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialModule } from '../material.module';
import { LanguageService } from '../services/language.service';
import { InfokitComponent } from '../infokit/infokit.component';
import { InfokitService } from '../services/infokit.service';
import { BadgeService } from '../services/BadgeService/badge.service';
import { NotifyService } from '../badge/notify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, flush } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Badge } from '../badge/models/badgeModel';
import { LeaderBoardService } from '../services/leaderBoard.service';
import { NavbarService } from '../services/navbar.service';

const mockBadge: Badge = {
  name: 'badgeName',
  image: 'testImage',
  message: 'testMessage'
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let httpMock: HttpClient;
  let badgeService: BadgeService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [HeaderComponent, InfokitComponent],
      providers: [
        AuthService,
        APIService,
        LanguageService,
        InfokitService,
        BadgeService,
        NotifyService,
        LeaderBoardService,
        NavbarService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    badgeService = TestBed.get(BadgeService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(' should load badges', async(() => {
    spyOn(badgeService, 'getBadge').and.returnValue(Observable.of(mockBadge));
    component.loadBadge();
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(component.badge).toEqual(mockBadge);
    })
  }))
});
