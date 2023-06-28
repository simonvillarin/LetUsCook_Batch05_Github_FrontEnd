import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  programs = [
    {
      id: 1000,
      progCode: 'IT 101',
      progTitle: 'Introduction to Programming',
    },
  ];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  constructor(private programService: ProgramService) {}

  ngOnInit(): void {
    this.getAllPrograms();
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
    scroll(0, 0);
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((data) => console.log(data));
  };
}
