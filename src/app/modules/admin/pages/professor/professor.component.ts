import { HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent {
  visible: boolean = false;
  genders = [{ gender: 'Gender' }, { gender: 'Male' }, { gender: 'Female' }];
  civilStatus = [
    { status: 'Civil Status' },
    { status: 'Single' },
    { status: 'Married' },
    { status: 'Divorced' },
    { status: 'Widowed' },
  ];
  status = [
    { status: 'Employement Status' },
    { status: 'Part Time' },
    { status: 'Full Time' },
  ];
  professors = [
    {
      id: '1',
      name: 'Mark Perez',
      email: 'mark@gmail.com',
      mobile: '09122236788',
      status: 'Part-time',
    },
    {
      id: '2',
      name: 'Simon Villarin',
      email: 'simon123@gmail.com',
      mobile: '09090989911',
      status: 'Regular',
    },
    {
      id: '3',
      name: 'Ember San Miguel',
      email: 'ember123@gmail.com',
      mobile: '09090989943',
      status: 'OJT',
    },
  ];

  showDialog() {
    this.visible = true;
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

  closeDialog = () => {
    this.visible = false;
  };
}
