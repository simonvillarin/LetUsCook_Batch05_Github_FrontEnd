import { Component } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService],
})
export class StudentComponent {
  students = [
    {
      id: '1',
      studentNo: '202312345',
      name: 'Mark Perez',
      program: 'BSIT',
      yearLevel: 'First Year',
    },
    {
      id: '2',
      studentNo: '202342345',
      name: 'Simon Villarin',
      program: 'BSIT',
      yearLevel: 'First Year',
    },
    {
      id: '3',
      studentNo: '202312345',
      name: 'Ember San Miguel',
      program: 'BSIT',
      yearLevel: 'First Year',
    },
  ];

  constructor(private messageService: MessageService) {}

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File Uploaded successfully',
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
}
