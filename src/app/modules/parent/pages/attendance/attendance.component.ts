import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
  attendance = [
    {
      subject: 'Introduction to Programming',
      status: 'Present',
      uploadDate: 'July 1, 2023',
    },
    {
      subject: 'Data Structures',
      status: 'Present',
      uploadDate: 'July 1, 2023',
    },
    {
      subject: 'Ethics I',
      status: 'Absent',
      uploadDate: 'July 1, 2023',
    },
  ];

  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  period = [{ name: 'Prelims' }, { name: 'Midterms' }, { name: 'Finals' }];

  termsSelected: string = 'First Term';
  periodSelected: string = 'Prelims';

  termSelected: FormGroup;

  constructor(private fb: FormBuilder) {
    this.termSelected = fb.group({
      term: [''],
      period: [''],
    });
  }

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
    this.isShowNotifications = false;
  };

  toggleShowNotifications = () => {
    this.isShowNotifications = !this.isShowNotifications;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  onTermChange = (term: any) => {
    this.termsSelected = term.name;
  };

  onPeriodChange = (period: any) => {
    this.periodSelected = period.name;
  };
}
