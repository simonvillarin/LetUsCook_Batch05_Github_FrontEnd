import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
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

  professor: any = {};
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

  isCurrentPasswordHidden: boolean = false;
  isNewPasswordHidden: boolean = false;
  isConfirmPasswordHidden: boolean = false;

  personalForm: FormGroup;
  addressForm: FormGroup;
  contactForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private professorService: ProfessorService,
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
    this.getProfessorById();
    this.getAccountByUserId();
  }

  getProfessorById = () => {
    this.professorService
      .getProfessorById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.imagePreview = data.image;
        this.bannerPreview = data.banner;
        this.professor = data;
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

  toggleCurrentPassword = () => {
    this.isCurrentPasswordHidden = !this.isCurrentPasswordHidden;
  };

  toggleNewPassword = () => {
    this.isNewPasswordHidden = !this.isNewPasswordHidden;
  };

  toggleConfirmPassword = () => {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
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
    this.professorService
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
    this.professorService
      .updateBanner(this.authService.getUserId(), formData)
      .subscribe((res) => console.log(res));
  };

  onEditPersonal = () => {
    this.editPersonal = !this.editPersonal;
    this.personalForm.patchValue({
      firstname: this.professor.firstname,
      middlename: this.professor.middlename,
      lastname: this.professor.lastname,
      suffix: this.professor.suffix,
      gender: this.professor.gender,
      civilStatus: this.professor.civilStatus,
      birthdate: this.professor.birthdate,
      birthplace: this.professor.birthplace,
      citizenship: this.professor.citizenship,
      religion: this.professor.religion,
    });
  };

  onEditAddress = () => {
    this.editAddress = !this.editAddress;
    this.addressForm.patchValue({
      unit: this.professor.unit,
      street: this.professor.street,
      subdivision: this.professor.subdivision,
      barangay: this.professor.barangay,
      city: this.professor.city,
      province: this.professor.province,
      zipcode: this.professor.zipcode,
    });
  };

  onEditContact = () => {
    this.editContact = !this.editContact;
    this.contactForm.patchValue({
      telephone: this.professor.telephone,
      mobile: this.professor.mobile,
      email: this.professor.email,
    });
  };

  onEditPassword = () => {
    this.editPassword = !this.editPassword;
  };

  onSubmitPersonal = () => {
    if (this.personalForm.valid) {
      this.professorService
        .updateProfessor(this.professor.professorId, this.personalForm.value)
        .subscribe(() => this.getProfessorById());
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
      this.professorService
        .updateProfessor(this.professor.professorId, this.addressForm.value)
        .subscribe(() => this.getProfessorById());
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
      this.professorService
        .updateProfessor(this.professor.professorId, this.contactForm.value)
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
            this.getProfessorById();
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
        this.accountService
          .updateAccount(this.professor.professorId, {
            password: this.passwordForm.get('newPassword')?.value,
          })
          .subscribe(() => this.getProfessorById());
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
