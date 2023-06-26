import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  parent = [
    {
      id: 1,
      name: 'Mark Perez',
      email: 'mark123@gmail.com',
      mobile: '09090989988',
      relationship: 'Father',
    },
    {
      id: 2,
      name: 'Simon Villarin',
      email: 'simon123@gmail.com',
      mobile: '09090989911',
      relationship: 'Father',
    },
    {
      id: 3,
      name: 'Ember San Miguel',
      email: 'ember123@gmail.com',
      mobile: '09090989943',
      relationship: 'Father',
    },
  ];
  relationship = [{ name: 'Father' }, { name: 'Mother' }, { name: 'Other' }];

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
