import { CurriculumDialogComponent } from './../../components/curriculum-dialog/curriculum-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent {
  curriculums = [
    {
      id: 1000,
      term: 'First Term',
      yearLevel: 'Third Year',
      program: 'BSIT',
      subject: 'Advanced Database',
    },
  ];
  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  levels = [
    { name: 'First Year' },
    { name: 'Second Year' },
    { name: 'Third Year' },
    { name: 'Fourth Year' },
  ];
  programs = [
    { name: 'BSIT' },
    { name: 'BSBA' },
    { name: 'BSHM' },
    { name: 'BSTM' },
  ];
  subjects = [
    { name: 'Introduction to Programming' },
    { name: 'Data Structures' },
    { name: 'Database I' },
    { name: 'Web Development I' },
  ];
  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;

  constructor(private addDialog: MatDialog) {}

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

  onClickAdd = () => {
    this.isDialogOpen = true;
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };
}
