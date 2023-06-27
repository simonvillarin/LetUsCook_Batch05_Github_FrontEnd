import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
}
