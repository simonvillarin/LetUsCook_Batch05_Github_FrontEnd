import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpEvent } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent {
  personalForm: FormGroup;
  addressForm: FormGroup;
  contactForm: FormGroup;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.personalForm = fb.group({
      firstname: [''],
    });
    this.addressForm = fb.group({});
    this.contactForm = fb.group({});
  }

  isFormPersonalActive: boolean = true;
  isFormAddressActive: boolean = true;
  isFormContactActive: boolean = true;

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

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File Uploaded successfully',
    });
  }

  onEnablePersonalForm = () => {
    this.isFormPersonalActive = !this.isFormPersonalActive;
    console.log(this.isFormPersonalActive);
  };

  onEnableAddressForm = () => {
    this.isFormAddressActive = !this.isFormAddressActive;
  };

  onEnableContactForm = () => {
    this.isFormContactActive = !this.isFormContactActive;
  };
}
