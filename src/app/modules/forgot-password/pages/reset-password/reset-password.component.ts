import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  passwordForm: FormGroup;
  alert: boolean = false;
  isSending: boolean = false;
  pass: boolean = false;
  confirmPass: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.passwordForm = fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  togglePassword = () => {
    this.pass = !this.pass;
  };

  toggleConfirmPass = () => {
    this.confirmPass = !this.confirmPass;
  };

  onSubmitPassword = () => {
    if (this.passwordForm.valid) {
      const id = localStorage.getItem('id');
      if (id) {
        this.accountService
          .updateAccount(parseInt(id), {
            password: this.passwordForm.get('password')?.value,
          })
          .subscribe();
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
          this.router.navigate(['/']);
          localStorage.removeItem('id');
          localStorage.removeItem('otp');
        }, 3000);
      } else {
        this.router.navigate(['forgot-password/email']);
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  };
}
