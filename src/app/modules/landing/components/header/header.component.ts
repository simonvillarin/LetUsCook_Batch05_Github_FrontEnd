import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMobileNav: boolean = false;
  isLoginOpen: boolean = false;

  errorDialog = false;

  constructor(
    private loginDialog: MatDialog,
    private router: Router,
    private calendarService: CalendarService
  ) {}

  isMobileNavOpen = () => {
    this.showMobileNav = !this.showMobileNav;
  };

  showLoginDialog = () => {
    this.router.navigate(['/']);
    this.loginDialog.open(LoginDialogComponent, {
      width: '500px',
    });
  };

  getCalendar = () => {
    let valid = false;
    this.calendarService.getCalendar().subscribe((data) => {
      console.log(data);
      const startEnrollment = data[0].startEnrollement;
      const endEnrollment = data[0].endEnrollment;
      valid = this.isDateBetween(startEnrollment, endEnrollment);
    });
    return valid;
  };

  isDateBetween(startDateStr: any, endDateStr: any) {
    const currentDate = new Date();
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return currentDate >= startDate && currentDate <= endDate;
  }

  apply = () => {
    if (this.getCalendar()) {
      this.errorDialog = true;
    } else {
      this.router.navigate(['/apply']);
    }
  };

  onOkError = () => {
    this.errorDialog = false;
  };
}
