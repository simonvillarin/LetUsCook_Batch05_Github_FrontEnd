import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  professorList = [
    {
      id: 1000,
      name: 'Lebron James',
      subject: 'Introduction to Breaking Scoring Records',
      day: 'Tuesday',
      time: '7:00 - 9:00',
      section: '101',
      room: '501',
    },
  ];

  professors = [
    { name: 'Lebron James' },
    { name: 'Stephen Curry' },
    { name: 'Michael Jordan' },
  ];

  subjects = [
    { name: 'Introduction to Breaking Scoring Records' },
    { name: 'Introduction to Making Threes' },
    { name: 'Introduction to Being a GOAT' },
  ];

  days = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
  ];

  startTime = [
    { name: '7:00' },
    { name: '8:00' },
    { name: '9:00' },
    { name: '10:00' },
    { name: '11:00' },
    { name: '12:00' },
    { name: '1:00' },
  ];

  endTime = [
    { name: '7:00' },
    { name: '8:00' },
    { name: '9:00' },
    { name: '10:00' },
    { name: '11:00' },
    { name: '12:00' },
    { name: '1:00' },
  ];

  sections = [
    { name: '101' },
    { name: '102' },
    { name: '103' },
    { name: '104' },
    { name: '105' },
  ];

  rooms = [
    { name: '501' },
    { name: '302' },
    { name: '133' },
    { name: '194' },
    { name: '192' },
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
