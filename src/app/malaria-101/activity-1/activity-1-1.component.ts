import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-activity-1-1',
    templateUrl: './activity-1-1.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class AnimatedVideoComponent {
    public activityComplete = true;
}
