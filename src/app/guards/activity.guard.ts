import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../services/language.service';

@Injectable()
export class ActivityGuard implements CanActivate {

  constructor(private router: Router, private dashboardService: DashboardService, private sharedDataService: SharedDataService,
              private toastr: ToastrService, private languageService: LanguageService) {
  };

  canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.dashboardService.getProgressStatus().pipe(
      map(
        result => {
          if (this.sharedDataService.checkProgress(routeSnapshot.data.prevStage, routeSnapshot.data.prevActivity, result)) {
            return true;
          }
          this.languageService.loadLanguage().subscribe(res => {
            const alert = res.pcprepkit.activityAccess.alert;
            this.router.navigate(['/menu']);
            this.toastr.info(alert);
            return false;
          });
        }),
      catchError(error => {
        this.router.navigate(['/menu']);
        return observableOf(false);
      }), );
  }
}

