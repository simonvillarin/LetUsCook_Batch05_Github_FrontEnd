import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  subjects = [
    {
      id: 1000,
      program: 'BSIT',
      subjectCode: 'IT 101',
      subjectTitle: 'Advanced Programming',
      units: '3.0',
      type: 'Major',
      preReqs: ['Basic Programming', 'Intro to Programming'],
    },
  ];
  types = [{ name: 'Major' }, { name: 'Minor' }, { name: 'Elective' }];
  activeDeactive = [{ name: 'Activate' }, { name: 'Deactivate' }];

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
    scroll(0, 0);
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };
}
