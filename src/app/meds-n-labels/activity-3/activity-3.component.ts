import { AfterViewChecked, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DoctorService } from '../../services/doctorchat.service';
import { SharedDataService } from '../../services/shared.data.service';
import { InfokitService } from '../../services/infokit.service';
import { DashboardService } from '../../services/dashboard.service';
import { LanguageService } from '../../services/language.service';
import { BotService } from '../../services/BotService/bot.service';

@Component({
    selector: 'app-doctorchat',
    templateUrl: './activity-3.component.html',
    styleUrls: ['./activity-3.component.scss']
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

    constructor(private _doctorchat: DoctorService, private _sharedData: SharedDataService, vcr: ViewContainerRef, private _infokitService: InfokitService,  private _dashboardService: DashboardService, private _langService: LanguageService, private _botService: BotService) {

    }

    ngOnInit() {
        this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        this._infokitService.activateinfokit('doctor_info').subscribe(res => {});
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels.doctorChat;
            this.messages.push({message: this.language.introMessage, status: 'recv-message'});
        });
    }

    ngAfterViewChecked() {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }

    send(sentMessage) {
      this.chatMessage = '';
      if (sentMessage) {
        this.messages.push({message: {text: sentMessage}, status: 'sent-message'});
        if (localStorage.getItem(DoctorchatComponent._localStorageKey)) {
          this._botService.getIntent(sentMessage).subscribe(intent => {
            this._botService.getResponse(sentMessage).subscribe(text => {
              if (this._botService.checkCustomIntent(intent)) {
                const customResponse = this._botService.getCustomResponse(intent);
                customResponse['text'] = text;
                this.messages.push({message: customResponse, status: 'recv-message'});
              } else {
                this.messages.push({message: {text}, status: 'recv-message'});
              }
            })
          })
        }
      }
    }
}

