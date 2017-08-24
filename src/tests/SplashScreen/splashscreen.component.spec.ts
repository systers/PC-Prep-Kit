import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashscreenComponent } from '../../app/splashscreen/splashscreen.component';

describe('SplashscreenComponent', () => {
    let component: SplashscreenComponent;
    let fixture: ComponentFixture<SplashscreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],      
            declarations: [ SplashscreenComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplashscreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
