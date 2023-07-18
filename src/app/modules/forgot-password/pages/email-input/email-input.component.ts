import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
})
export class EmailInputComponent {
  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  alert: boolean = false;
  isSending: boolean = false;
  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  userId: any;
  otpCode: any;

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.emailForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.otpForm = fb.group({
      otp: ['', [Validators.required]],
    });
    this.passwordForm = fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get email() {
    return this.emailForm.get('email') as FormControl;
  }

  get otp() {
    return this.otpForm.get('otp') as FormControl;
  }

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  onSubmitEmail = () => {
    if (this.emailForm.valid) {
      const emailAddress = this.emailForm.get('email')?.value;

      this.emailService.checkEmail(emailAddress).subscribe((res: any) => {
        if (res.message == 'Email not found') {
          this.alert = true;
          setTimeout(() => (this.alert = false), 3000);
        } else {
          this.userId = parseInt(res.message);
          console.log(res.message);
          this.emailService.sendOTP(emailAddress).subscribe((res: any) => {
            this.otpCode = res;
          });
          this.isSending = true;
          setTimeout(() => {
            this.isSending = false;
            this.card2 = true;
            this.card1 = false;
          }, 3000);
        }
      });
    } else {
      this.emailForm.markAllAsTouched();
    }
  };

  onSubmitOTP = () => {
    if (this.otpForm.valid) {
      if (this.otpForm.get('otp')?.value == this.otpCode) {
        this.card3 = true;
        this.card2 = false;
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  };

  onSubmitPassword = () => {
    if (this.passwordForm.valid) {
      this.accountService
        .updateAccount(this.userId, {
          password: this.passwordForm.get('password')?.value,
        })
        .subscribe();
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
        this.router.navigate(['/']);
      }, 3000);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  };
}
