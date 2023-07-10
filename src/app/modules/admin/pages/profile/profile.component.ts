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
  fileImage: any;
  fileBanner: any;
  imagePreview: string | ArrayBuffer | null = null;
  bannerPreview: string | ArrayBuffer | null = null;

  admin: any;
  username: string = '';
  password: string = '';

  editPersonal: boolean = false;
  editAddress: boolean = false;
  editContact: boolean = false;
  editPassword: boolean = false;

  alertPersonal: boolean = false;
  alertAddress: boolean = false;
  alertContact: boolean = false;
  alertPassword: boolean = false;
  alertStatus: string = 'Success';
  alertMessage: string = 'Professor successfully added';

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
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      suffix: [''],
      gender: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      birthdate: ['', [Validators.required, birthdateValidator()]],
      birthplace: ['', [Validators.required]],
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
  }

  ngOnInit(): void {
    this.getAdminById();
    this.getAccountByUserId();
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.imagePreview = data.image;
        this.bannerPreview = data.bannerImage;
        this.admin = data;
      });
  };

  getAccountByUserId = () => {
    this.accountService
      .getAccountByUserId(this.authService.getUserId())
      .subscribe((data: any) => {
        this.username = data.username;
        this.password = data.pass;
      });
  };

  get firstName() {
    return this.personalForm.get('firstname');
  }

  get middleName() {
    return this.personalForm.get('middlename');
  }

  get lastName() {
    return this.personalForm.get('lastname');
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
    return this.personalForm.get('birthdate');
  }

  get birthPlace() {
    return this.personalForm.get('birthplace');
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

  onEditPersonal = () => {
    this.editPersonal = !this.editPersonal;
    this.personalForm.patchValue({
      firstname: this.admin.firstname,
      middlename: this.admin.middlename,
      lastname: this.admin.lastname,
      suffix: this.admin.suffix,
      gender: this.admin.gender,
      civilStatus: this.admin.civilStatus,
      birthdate: this.admin.birthdate,
      birthplace: this.admin.birthplace,
      citizenship: this.admin.citizenship,
      religion: this.admin.religion,
    });
  };

  onEditAddress = () => {
    this.editAddress = !this.editAddress;
    this.addressForm.patchValue({
      unit: this.admin.unit,
      street: this.admin.street,
      subdivision: this.admin.subdivision,
      barangay: this.admin.barangay,
      city: this.admin.city,
      province: this.admin.province,
      zipcode: this.admin.zipcode,
    });
  };

  onEditContact = () => {
    this.editContact = !this.editContact;
    this.contactForm.patchValue({
      telephone: this.admin.telephone,
      mobile: this.admin.mobile,
      email: this.admin.email,
    });
  };

  onEditPassword = () => {
    this.editPassword = !this.editPassword;
  };

  onSubmitPersonal = () => {
    if (this.personalForm.valid) {
      this.adminService
        .updateAdmin(this.admin.adminId, this.personalForm.value)
        .subscribe(() => this.getAdminById());
      this.alertPersonal = true;
      setTimeout(() => {
        this.alertPersonal = false;
      }, 3000);
      this.alertStatus = 'Success';
      this.alertMessage = 'Personal information successfully updated';
      this.editPersonal = false;
    } else {
      this.personalForm.markAllAsTouched();
    }
  };

  onSubmitAddress = () => {
    if (this.addressForm.valid) {
      this.adminService
        .updateAdmin(this.admin.adminId, this.addressForm.value)
        .subscribe(() => this.getAdminById());
      this.alertAddress = true;
      setTimeout(() => {
        this.alertAddress = false;
      }, 3000);
      this.alertStatus = 'Success';
      this.alertMessage = 'Address information successfully updated';
      this.editAddress = false;
    } else {
      this.addressForm.markAllAsTouched();
    }
  };

  onSubmitContact = () => {
    if (this.contactForm.valid) {
      this.adminService
        .updateAdmin(this.admin.adminId, this.contactForm.value)
        .subscribe((res: any) => {
          if (res.message == 'Email already exist') {
            this.alertContact = true;
            setTimeout(() => {
              this.alertContact = false;
            }, 3000);
            this.alertStatus = 'Error';
            this.alertMessage = 'Email address already exists';
            this.editContact = false;
          } else {
            this.getAdminById();
            this.alertContact = true;
            setTimeout(() => {
              this.alertContact = false;
            }, 3000);
            this.alertStatus = 'Success';
            this.alertMessage = 'Contact details successfully updated';
            this.editContact = false;
          }
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  };

  onSubmitPassword = () => {
    if (this.passwordForm.valid) {
      if (this.password != this.passwordForm.get('currentPassword')?.value) {
        this.alertPassword = true;
        setTimeout(() => {
          this.alertPassword = false;
        }, 3000);
        this.alertStatus = 'Error';
        this.alertMessage =
          'Current password you entered does not match your current password';
      } else {
        this.adminService
          .updateAdmin(this.admin.adminId, this.passwordForm.value)
          .subscribe(() => this.getAdminById());
        this.alertPassword = true;
        setTimeout(() => {
          this.alertPassword = false;
        }, 3000);
        this.alertStatus = 'Success';
        this.alertMessage = 'Password successfully updated';
        this.passwordForm.reset();
        this.editPassword = false;
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  };
}
