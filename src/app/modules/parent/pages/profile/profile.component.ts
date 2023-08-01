import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import {
  PasswordLengthValidator,
  birthdateValidator,
  confirmPasswordValidator,
  hasLowercaseValidator,
  hasNumberValidator,
  hasSymbolValidator,
  hasUppercaseValidator,
  mobileNumberValidator,
  telephoneNumberValidator,
  zipcodeValidator,
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

  parent: any = {};
  username: string = '';
  password: string = '';

  editPersonal: boolean = false;
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
  passwordForm: FormGroup;
  constructor(
    private parentService: ParentService,
    private authService: AuthService,
    private profileService: ProfileService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.personalForm = fb.group({
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      suffix: [''],
      address: ['', [Validators.required]],
      contact: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          mobileNumberValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
    this.passwordForm = fb.group(
      {
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
        confirmPassword: [
          '',
          [Validators.required, confirmPasswordValidator()],
        ],
      },
      { validators: confirmPasswordValidator() }
    );
  }

  ngOnInit(): void {
    this.getParent();
  }

  getParent = () => {
    this.parentService
      .getParentById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.parent = data;
        console.log(this.parent);
        this.imagePreview = data.image;
        this.bannerPreview = data.banner;
        const username = this.parent.firstname + ' ' + this.parent.lastname;
        this.profileService.setUsername(username);
        const userPic = this.parent.image;
        this.profileService.setUserPic(userPic);
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

  get address() {
    return this.personalForm.get('address');
  }

  get telephone() {
    return this.personalForm.get('telephone');
  }

  get contact() {
    return this.personalForm.get('contact');
  }

  get email() {
    return this.personalForm.get('email');
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
    this.parentService
      .updateParentWithImage(this.authService.getUserId(), formData)
      .subscribe((res: any) => {
        console.log(res.message);

        const userPic = res.message;
        this.profileService.setUserPic(userPic);
      });
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
    this.parentService
      .updateBanner(this.authService.getUserId(), formData)
      .subscribe();
  };

  onEditPersonal = () => {
    this.editPersonal = !this.editPersonal;
    this.personalForm.patchValue({
      firstname: this.parent.firstname,
      middlename: this.parent.middlename,
      lastname: this.parent.lastname,
      suffix: this.parent.suffix,
      address: this.parent.address,
      contact: this.parent.contact,
      email: this.parent.email,
    });
  };

  onEditPassword = () => {
    this.accountService
      .getAccountByUserId(this.authService.getUserId())
      .subscribe((data: any) => {
        this.username = data.username;
        this.password = data.pass;
      });
    this.editPassword = !this.editPassword;
  };

  onSubmitPersonal = () => {
    if (this.personalForm.valid) {
      console.log(this.personalForm);

      this.parentService
        .updateParent(this.parent.parentId, this.personalForm.value)
        .subscribe(() => this.getParent());
      this.alertPersonal = true;
      setTimeout(() => {
        this.alertPersonal = false;
      }, 3000);
      this.alertStatus = 'Success';
      this.alertMessage = 'Personal information successfully updated';
      this.editPersonal = false;
      const username =
        this.personalForm.get('firstname')?.value +
        ' ' +
        this.personalForm.get('lastname')?.value;
      this.profileService.setUsername(username);
    } else {
      this.personalForm.markAllAsTouched();
    }
  };

  onSubmitPassword = () => {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.get('newPassword')?.value, 'form password');
      console.log(this.password, 'password');
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
          .updateAccount(this.parent.parentId, {
            password: this.passwordForm.get('newPassword')?.value,
          })
          .subscribe(() => this.getParent());
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
