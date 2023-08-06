import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  otpForm: FormGroup;
  alert: boolean = false;
  error = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService
  ) {
    this.otpForm = fb.group({
      otp: ['', [Validators.required]],
    });
  }

  get otp() {
    return this.otpForm.get('otp') as FormControl;
  }

  onSubmitOTP = () => {
    if (this.otpForm.valid) {
      const otp = localStorage.getItem('otp');
      if (otp) {
        const localOtp = JSON.parse(otp);
        this.emailService
          .checkOTPExpiration(localOtp.email)
          .subscribe((res) => {
            if (!res) {
              if (this.otpForm.get('otp')?.value == localOtp.otp) {
                localStorage.setItem('reset', 'true');
                this.router.navigate(['forgot-password/reset']);
              } else {
                this.alert = true;
                this.error = 'Error';
                this.errorMessage = 'Invalid OTP Code';
                setTimeout(() => {
                  this.alert = false;
                }, 3000);
              }
            } else {
              this.alert = true;
              this.error = 'Error';
              this.errorMessage =
                'The One-Time Password (OTP) has already expired';
              setTimeout(() => {
                this.alert = false;
              }, 3000);
            }
          });
      } else {
        this.router.navigate(['forgot-password/email']);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  };

  resend = () => {
    const otp = localStorage.getItem('otp');
    if (otp) {
      const localOtp = JSON.parse(otp);
      this.emailService.sendOTP(localOtp.email).subscribe((res: any) => {
        localStorage.setItem(
          'otp',
          JSON.stringify({ email: localOtp.email, otp: res })
        );
        this.alert = true;
        this.error = 'Success';
        this.errorMessage =
          'A One-Time Password (OTP) has already been sent to your email.';
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    }
  };
}
