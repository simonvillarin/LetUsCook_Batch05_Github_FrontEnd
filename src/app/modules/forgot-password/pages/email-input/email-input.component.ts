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
  alert: boolean = false;
  isSending: boolean = false;

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.emailForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.emailForm.get('email') as FormControl;
  }

  onSubmitEmail = () => {
    if (this.emailForm.valid) {
      const emailAddress = this.emailForm.get('email')?.value;

      this.emailService.checkEmail(emailAddress).subscribe((res: any) => {
        if (res.message == 'Email not found') {
          this.alert = true;
          setTimeout(() => (this.alert = false), 3000);
        } else {
          localStorage.setItem('id', res.message);
          this.emailService.sendOTP(emailAddress).subscribe((res: any) => {
            localStorage.setItem(
              'otp',
              JSON.stringify({ email: emailAddress, otp: res })
            );
            this.router.navigate(['forgot-password/otp']);
          });
          this.isSending = true;
          setTimeout(() => {
            this.isSending = false;
          }, 6000);
        }
      });
    } else {
      this.emailForm.markAllAsTouched();
    }
  };
}
