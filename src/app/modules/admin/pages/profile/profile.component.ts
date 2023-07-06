import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  personalInfo: boolean = true;
  addressInfo: boolean = false;
  contactInfo: boolean = false;
  userInfo: boolean = false;

  fileImage: any;
  fileBanner: any;
  imagePreview: string | ArrayBuffer | null = null;
  bannerPreview: string | ArrayBuffer | null = null;

  profileForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = fb.group({
      sample: ['Hello'],
    });
  }

  ngOnInit(): void {
    this.getAdminById();
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data) => {
        this.imagePreview = data.image;
        this.bannerPreview = data.bannerImage;
      });
  };

  onPersonalInfo = () => {
    this.personalInfo = true;
    this.addressInfo = false;
    this.contactInfo = false;
    this.userInfo = false;
  };

  onAddressInfo = () => {
    this.personalInfo = false;
    this.addressInfo = true;
    this.contactInfo = false;
    this.userInfo = false;
  };

  onContactInfo = () => {
    this.personalInfo = false;
    this.addressInfo = false;
    this.contactInfo = true;
    this.userInfo = false;
  };

  onUserInfo = () => {
    this.personalInfo = false;
    this.addressInfo = false;
    this.contactInfo = false;
    this.userInfo = true;
  };

  onImageChange = (event: any) => {
    this.fileImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(this.fileImage);

    const formData = new FormData();
    formData.append('image', this.fileImage);
    this.adminService
      .updateImage(this.authService.getUserId(), formData)
      .subscribe((res) => console.log(res));
  };

  onBannerChange = (event: any) => {
    this.fileBanner = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.bannerPreview = e.target.result;
    };

    reader.readAsDataURL(this.fileBanner);
    const formData = new FormData();
    formData.append('banner', this.fileBanner);
    this.adminService
      .updateBanner(this.authService.getUserId(), formData)
      .subscribe((res) => console.log(res));
  };
}
