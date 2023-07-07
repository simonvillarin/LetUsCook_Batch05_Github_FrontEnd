import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import {
  PasswordLengthValidator,
  hasUppercaseValidator,
  hasLowercaseValidator,
  hasNumberValidator,
  hasSymbolValidator,
  zipcodeValidator,
  mobileNumberValidator,
  telephoneNumberValidator,
  birthdateValidator,
} from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('genderDropdown') genderDropdown: Dropdown | undefined;

  personalInfo: boolean = true;
  addressInfo: boolean = false;
  contactInfo: boolean = false;
  userInfo: boolean = false;

  fileImage: any;
  fileBanner: any;
  imagePreview: string | ArrayBuffer | null = null;
  bannerPreview: string | ArrayBuffer | null = null;

  fName: string = '';
  lName: string = '';
  username: string = '';
  genderSelected: string = '';

  genders = ['Male', 'Female'];
  civil = ['Single', 'Married', 'Divorced', 'Widowed'];

  personalForm: FormGroup;
  addressForm: FormGroup;
  contactForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.personalForm = fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      suffix: [''],
      gender: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      birthDate: ['', [Validators.required, birthdateValidator()]],
      birthPlace: ['', [Validators.required]],
      religion: ['', [Validators.required]],
    });
    this.addressForm = fb.group({
      unit: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subdivision: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipcode: ['', [Validators.required, zipcodeValidator()]],
    });
    this.contactForm = fb.group({
      telephone: ['', [Validators.required, telephoneNumberValidator()]],
      mobile: ['', [Validators.required, mobileNumberValidator()]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.passwordForm = fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          PasswordLengthValidator(),
          hasUppercaseValidator(),
          hasLowercaseValidator(),
          hasNumberValidator(),
          hasSymbolValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
    this.personalForm.patchValue({
      gender: 'Male',
      civilStatus: 'Single',
    });
  }

  ngOnInit(): void {
    this.getAdminById();
    this.getAccountByUserId();
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data) => {
        this.imagePreview = data.image;
        this.bannerPreview = data.bannerImage;
        this.fName = data.firstname;
        this.lName = data.lastname;
      });
  };

  getAccountByUserId = () => {
    this.accountService
      .getAccountByUserId(this.authService.getUserId())
      .subscribe((data: any) => {
        this.username = data.username;
      });
  };

  get firstName() {
    return this.personalForm.get('firstName');
  }

  get middleName() {
    return this.personalForm.get('middleName');
  }

  get lastName() {
    return this.personalForm.get('lastName');
  }

  get suffix() {
    return this.personalForm.get('suffix');
  }

  get gender() {
    return this.personalForm.get('gender');
  }

  get civilStatus() {
    return this.personalForm.get('civilStatus');
  }

  get citizenship() {
    return this.personalForm.get('citizenship');
  }

  get birthDate() {
    return this.personalForm.get('birthDate');
  }

  get birthPlace() {
    return this.personalForm.get('birthPlace');
  }

  get religion() {
    return this.personalForm.get('religion');
  }

  get unit() {
    return this.addressForm.get('unit');
  }

  get street() {
    return this.addressForm.get('street');
  }

  get subdivision() {
    return this.addressForm.get('subdivision');
  }

  get barangay() {
    return this.addressForm.get('barangay');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get province() {
    return this.addressForm.get('province');
  }

  get zipcode() {
    return this.addressForm.get('zipcode');
  }

  get telephone() {
    return this.contactForm.get('telephone');
  }

  get mobile() {
    return this.contactForm.get('mobile');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onPersonalInfo = () => {
    this.personalInfo = true;
    this.addressInfo = false;
    this.contactInfo = false;
    this.userInfo = false;
    const yOffset = window.innerHeight * 0.4;
    window.scrollTo(0, yOffset);
  };

  onAddressInfo = () => {
    this.personalInfo = false;
    this.addressInfo = true;
    this.contactInfo = false;
    this.userInfo = false;
    const yOffset = window.innerHeight * 0.8;
    window.scrollTo(0, 800);
  };

  onContactInfo = () => {
    this.personalInfo = false;
    this.addressInfo = false;
    this.contactInfo = true;
    this.userInfo = false;
    const yOffset = window.innerHeight * 0.4;
    window.scrollTo(0, yOffset);
  };

  onUserInfo = () => {
    this.personalInfo = false;
    this.addressInfo = false;
    this.contactInfo = false;
    this.userInfo = true;
    const yOffset = window.innerHeight * 0.4;
    window.scrollTo(0, yOffset);
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
