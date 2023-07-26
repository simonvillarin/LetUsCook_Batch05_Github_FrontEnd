import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  route: string = 'Home';
  admin: any = {};
  isShowDropdown = false;
  isShowMobileNav = false;
  isDialogOpen = false;
  calendar: any[] = [];

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  startEnrollement = new Date();
  endEnrollment = new Date();
  startClass = new Date();
  endClass = new Date();

  setupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private calendarService: CalendarService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.setupForm = fb.group({
      startEnrollement: ['', [Validators.required]],
      endEnrollment: ['', [Validators.required]],
      startClass: ['', [Validators.required]],
      endClass: ['', [Validators.required]],
    });
  }

  get enrolmentStart() {
    return this.setupForm.get('startEnrollement') as FormControl;
  }

  get enrolmentEnd() {
    return this.setupForm.get('endEnrollment') as FormControl;
  }

  get classStart() {
    return this.setupForm.get('startClass') as FormControl;
  }

  get classEnd() {
    return this.setupForm.get('endClass') as FormControl;
  }

  ngOnInit(): void {
    this.getAdminById();
    this.getCalendar();
    this.getLocation();
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.admin = data;
      });
  };

  getCalendar = () => {
    this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendar = data;
      if (data[0].startClass == null) {
        this.isDialogOpen = true;
      }
    });
  };

  getLocation = () => {
    const currentLocation = this.location.path();
    const splitLocation = currentLocation.split('/');
    const loc = splitLocation[splitLocation.length - 1];
    const loc1 = splitLocation[splitLocation.length - 2];
    if (loc == 'home') {
      return 'Home';
    } else if (loc == 'course') {
      return 'Course';
    } else if (loc == 'program') {
      return 'Program';
    } else if (loc == 'section') {
      return 'Section';
    } else if (loc == 'room') {
      return 'Room';
    } else if (loc == 'professor') {
      return 'Professor';
    } else if (loc == 'student') {
      return 'Student';
    } else if (loc == 'parent') {
      return 'Parent';
    }

    if (loc1 == 'schedule') {
      return 'Schedule';
    } else if (loc == 'section') {
      return 'Section';
    } else {
      return 'Profile';
    }
  };

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
    scroll(0, 0);
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  onChangeRoute = (route: string) => {
    this.route = route;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  profile = () => {
    this.router.navigate(['/admin/profile']);
    this.isShowDropdown = false;
  };

  logout = () => {
    if (this.authService.isUserLoggedIn()) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/']);
    this.isShowDropdown = false;
  };

  openDialog = () => {
    this.isDialogOpen = true;
    this.getCalendar();
    if (this.calendar.length > 0) {
      this.startEnrollement = new Date(this.calendar[0].startEnrollement);
      this.endEnrollment = new Date(this.calendar[0].endEnrollment);
      this.startClass = new Date(this.calendar[0].startClass);
      this.endClass = new Date(this.calendar[0].endClass);
    }
  };

  convertDateString = (originalDate: string): string => {
    const newDate = new Date(originalDate);
    const year = newDate.getFullYear();
    const month = this.formatWithLeadingZero(newDate.getMonth() + 1);
    const day = this.formatWithLeadingZero(newDate.getDate());
    return `${month}/${day}/${year}`;
  };

  formatWithLeadingZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  onSubmit = () => {
    if (this.setupForm.valid) {
      let startEnrollment = this.setupForm.get('startEnrollement')?.value;
      let endEnrollment = this.setupForm.get('endEnrollment')?.value;
      let startClass = this.setupForm.get('startClass')?.value;
      let endClass = this.setupForm.get('endClass')?.value;

      if (startEnrollment > endEnrollment) {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        this.alertStatus = 'Error';
        this.alertMessage =
          'Start enrollment date should not be greater than end enrollment date';
      } else if (startClass > endClass) {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        this.alertStatus = 'Error';
        this.alertMessage =
          'Start class date should not be greater than end class date';
      } else {
        const payload: any = {};
        startEnrollment = this.convertDateString(startEnrollment);
        if (this.calendar[0].startEnrollement != startEnrollment) {
          startEnrollment = this.setupForm.get('startEnrollement')?.value;
          startEnrollment.setDate(startEnrollment.getDate() + 1);
          payload.startEnrollement = startEnrollment;
          payload.endEnrollment = endEnrollment;
          payload.startClass = startClass;
          payload.endClass = endClass;
        }
        endEnrollment = this.convertDateString(endEnrollment);
        if (this.calendar[0].endEnrollment != endEnrollment) {
          endEnrollment = this.setupForm.get('endEnrollment')?.value;
          endEnrollment.setDate(endEnrollment.getDate() + 1);
          payload.startEnrollement = startEnrollment;
          payload.endEnrollment = endEnrollment;
          payload.startClass = startClass;
          payload.endClass = endClass;
        }
        startClass = this.convertDateString(startClass);
        if (this.calendar[0].startClass != startClass) {
          startClass = this.setupForm.get('startClass')?.value;
          startClass.setDate(startClass.getDate() + 1);
          payload.startEnrollement = startEnrollment;
          payload.endEnrollment = endEnrollment;
          payload.startClass = startClass;
          payload.endClass = endClass;
        }
        endClass = this.convertDateString(endClass);
        if (this.calendar[0].endClass != endClass) {
          endClass = this.setupForm.get('endClass')?.value;
          endClass.setDate(endClass.getDate() + 1);
          payload.startEnrollement = startEnrollment;
          payload.endEnrollment = endEnrollment;
          payload.startClass = startClass;
          payload.endClass = endClass;
        }
        console.log(payload);
        this.calendarService.addCalendar(payload).subscribe(() => {
          startEnrollment = '';
          endEnrollment = '';
          startClass = '';
          endClass = '';
          this.calendarService.getCalendar().subscribe((data: any) => {
            this.calendar = data;
            console.log(this.calendar);
            if (data[0].startClass == null) {
              this.isDialogOpen = true;
            }
          });
          this.startEnrollement = new Date();
          this.endEnrollment = new Date();
          this.startClass = new Date();
          this.endClass = new Date();
        });
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
          this.isDialogOpen = false;
        }, 3000);
        this.alertStatus = 'Success';
        this.alertMessage = 'School calendar saved successfully';
      }
    } else {
      this.setupForm.markAllAsTouched();
    }
  };
}
