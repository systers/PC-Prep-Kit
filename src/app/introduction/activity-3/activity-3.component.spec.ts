import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'webrtc-adapter';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { PicturePuzzleComponent } from './activity-3.component';
import { SharedDataService } from '../../services/shared.data.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ButtonNavComponent} from '../../button-nav/button-nav.component';
import {LanguageService} from '../../services/language.service';
import {ToastrService, ToastrModule} from 'ngx-toastr';

describe('PicturePuzzleComponent', () => {
    let component: PicturePuzzleComponent;
    let fixture: ComponentFixture<PicturePuzzleComponent>;
    let dashboardService: DashboardService;
    let apiService: APIService;
    let sharedService: SharedDataService;
    let browse: any;
    let puzzle: any;
    let saveProPic: any;
    let btn: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PicturePuzzleComponent,
            ButtonNavComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule,
              ToastrModule.forRoot()
            ],
            providers: [
                SharedDataService,
                DashboardService,
                APIService,
                LanguageService,
              ToastrService

            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PicturePuzzleComponent);
        component = fixture.componentInstance;
        dashboardService = TestBed.get(DashboardService);
        sharedService = TestBed.get(SharedDataService);
        apiService = TestBed.get(APIService);
        btn = fixture.debugElement.nativeElement.querySelectorAll('button');
        browse = btn[0];
        puzzle = btn[1];
        saveProPic = btn[2];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('webcam is open', async( () => {
        const webcamOpenBtn = fixture.debugElement.nativeElement.querySelector('#webcamOpen');
        spyOn(component, 'openWebcam');
        webcamOpenBtn.click();
        fixture.whenStable().then( () => {
          expect(component.openWebcam).toHaveBeenCalled();
          expect(component.webcamState).toEqual(component.webcamStates.OPENED);
          expect(component.webcamButtonText).toEqual('Capture');
          expect(puzzle.disabled).toEqual(true);
          expect(saveProPic.disabled).toEqual(true);
        });
    }));

});

