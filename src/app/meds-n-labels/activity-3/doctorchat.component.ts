import { Component, OnInit, AfterViewChecked, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DoctorService } from '../../services/doctorchat.service';
import { SharedDataService } from '../../services/shared.data.service';
import { InfokitService } from '../../services/infokit.service';
import { DashboardService } from '../../services/dashboard.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-doctorchat',
    templateUrl: './doctorchat.component.html',
    styleUrls: ['./doctorchat.component.scss']
})

export class DoctorchatComponent implements OnInit, AfterViewChecked {
    private static _localStorageKey = 'pcprepkitUser';
    private _status: object = {stage: 3, activity: 3};
    completed = true;
    activityComplete = true;
    chatMessage: string;
    language: any;
    messages = [];
    @ViewChild('chats') chatContainer;

    constructor(private _doctorchat: DoctorService, private _sharedData: SharedDataService, vcr: ViewContainerRef, private _infokitService: InfokitService, public toastr: ToastsManager, private _dashboardService: DashboardService, private _langService: LanguageService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        this._infokitService.activateinfokit('doctor_info').subscribe(res => {});
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels.doctorChat;
        });
        this.messages.push({message: this.language.introMessage, status: 'recv-message'});
    }

    ngAfterViewChecked() {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }

    send(sentMessage) {
        this.chatMessage = '';
        if (sentMessage) {
            this.messages.push({message: sentMessage, status: 'sent-message'});
            if (localStorage.getItem(DoctorchatComponent._localStorageKey)) {
                this._doctorchat.doctorMessage({message: sentMessage}).subscribe(response => {
                    this.messages.push({message: response.reply, status: 'recv-message'});
                });
            }
        }
    }
}
