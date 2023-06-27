import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent {
  grades = [
    {
      subject: 'Introduction to Programming',
      grade: '1.00',
      remarks: 'Excellent',
      uploadDate: 'July 1, 2023',
    },
    {
      subject: 'Data Structures',
      grade: '1.25',
      remarks: 'Excellent',
      uploadDate: 'July 1, 2023',
    },
    {
      subject: 'Ethics I',
      grade: '3.00',
      remarks: 'Fair',
      uploadDate: 'July 1, 2023',
    },
  ];

  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  period = [{ name: 'Prelims' }, { name: 'Midterms' }, { name: 'Finals' }];

  termsSelected: string = 'First Term';
  periodSelected: string = 'Prelims';

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  termSelected: FormGroup;

  constructor(private fb: FormBuilder) {
    this.termSelected = fb.group({
      term: [''],
      period: [''],
    });
  }

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
