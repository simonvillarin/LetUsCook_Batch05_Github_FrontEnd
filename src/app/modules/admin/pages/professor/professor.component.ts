import { HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}
@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
  providers: [MessageService],
})
export class ProfessorComponent {
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
