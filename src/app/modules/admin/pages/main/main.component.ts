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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  route: string = 'Home';
  admin: any;
  isShowDropdown = false;
  isShowMobileNav = false;
  isDialogOpen = false;
  schoolYear: any[] = [];
  calendar: any[] = [];
  terms: any = ['First Term', 'Second Term'];

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  setupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private calendarService: CalendarService,
    private fb: FormBuilder
  ) {
    this.setupForm = fb.group({
      startEnrollement: ['', [Validators.required]],
      endEnrollment: ['', [Validators.required]],
      startClass: ['', [Validators.required]],
      endClass: ['', [Validators.required]],
      sem: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
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

  get semester() {
    return this.setupForm.get('sem') as FormControl;
  }

  get academicYear() {
    return this.setupForm.get('academicYear') as FormControl;
  }

  ngOnInit(): void {
    this.getAdminById();
    this.getCalendar();
    const date = new Date();
    let currentYear = date.getFullYear();
    const nextYear = date.getFullYear() + 1;
    const schoolYear = String(currentYear) + ' - ' + String(nextYear);
    this.schoolYear.push(schoolYear);
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.admin = data;
        console.log(data);
      });
  };

  getCalendar = () => {
    this.calendarService.getCalendar().subscribe((data) => {
      this.calendar = data;
    });
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
    this.setupForm.patchValue({
      startEnrollement: this.calendar[0].startEnrollement,
      endEnrollment: this.calendar[0].endEnrollment,
      startClass: this.calendar[0].startClass,
      endClass: this.calendar[0].endClass,
      sem: this.calendar[0].sem,
      academicYear: this.calendar[0].academicYear,
    });
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  onSubmit = () => {
    console.log(1);
    if (this.setupForm.valid) {
      const startEnrollment = this.setupForm.get('startEnrollement')?.value;
      const endEnrollment = this.setupForm.get('endEnrollment')?.value;
      const startClass = this.setupForm.get('startClass')?.value;
      const endClass = this.setupForm.get('endClass')?.value;

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
        this.calendarService.addCalendar(this.setupForm.value).subscribe();
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
