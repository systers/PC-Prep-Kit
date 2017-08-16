import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'webrtc-adapter';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../app/services/dashboard.service';
import { APIService } from '../../app/services/api.service';
import { PicturePuzzleComponent } from '../../app/introduction/picture-puzzle.component';
import { SharedDataService } from '../../app/services/shared.data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

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
            declarations: [ PicturePuzzleComponent ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],             
            providers: [
                SharedDataService, 
                DashboardService,
                APIService
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

    it('webcam is open', () => {
        let webcamOpenBtn = fixture.debugElement.nativeElement.querySelector('#webcamOpen'); 
        webcamOpenBtn.click();
        expect(puzzle.disabled).toEqual(true);
        expect(saveProPic.disabled).toEqual(true);
        expect(component.webcamState).toEqual(component.webcamStates.OPENED); 
        expect(component.webcamButtonText).toEqual('Capture');              
    });

});
