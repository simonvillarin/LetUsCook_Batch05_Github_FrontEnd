import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  otpForm: FormGroup;
  alert: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
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
        if (this.otpForm.get('otp')?.value == otp) {
          localStorage.setItem('reset', 'true');
          this.router.navigate(['forgot-password/reset']);
        } else {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }
      } else {
        this.router.navigate(['forgot-password/email']);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  };
}
