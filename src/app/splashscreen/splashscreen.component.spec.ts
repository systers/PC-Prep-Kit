// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SplashscreenComponent } from './splashscreen.component';
// import {LanguageService} from '../services/language.service';
// import {CanActivate} from '@angular/router';
//
//
//
// describe('SplashscreenComponent', () => {
//     let component: SplashscreenComponent;
//     let fixture: ComponentFixture<SplashscreenComponent>;
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     const languageSpy = jasmine.createSpyObj('LanguageService', ['loadLanguage']);
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//           imports: [
//                 RouterTestingModule
//             ],
//           declarations: [ SplashscreenComponent ],
//           providers: [{provide: LanguageService, useValue: languageSpy}],
//         })
//         .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(SplashscreenComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should be created', () => {
//         expect(component).toBeTruthy();
//     });
// });
