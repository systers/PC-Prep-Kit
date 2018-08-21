import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BotService } from '../../app/services/BotService/bot.service';

// Test Response Constraints
const baseChatBot = environment.rasaCoreBaseURL + environment.rasaCoreEndpoint + 'default';
const mockUserQuery = 'Some mock user query';
const mockBotResponse = [{text: 'Some mock bot response'}];
const parseResponse = {intent: 'mockIntent'};
const responseUrl = baseChatBot + '/respond';
const parseUrl = baseChatBot + '/parse';


describe('BotService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let botService: BotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        BotService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    botService = TestBed.get(BotService);

  });
  afterEach(() => {
    httpMock.verify();
  });


  it('service should be created', () => {
    expect(botService).toBeTruthy();
  });

  it('should get a correct text response after querying thr bot', () => {
    botService.getResponse(mockUserQuery).subscribe(
      response => {
        expect(response).toEqual(mockBotResponse[0].text);
      }
    );
    const request = httpMock.expectOne(responseUrl);
    request.flush(mockBotResponse);
  });

  it('should parse the user\'s query correctly', () => {
    botService.getIntent(mockUserQuery).subscribe(
      response => {
        expect(response.intent).toEqual(parseResponse.intent);
      }
    );
    const request = httpMock.expectOne(parseUrl);
    request.flush(parseResponse);
  });
});

