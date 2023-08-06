import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  isPasswordHidden: boolean = true;
  isError: boolean = false;
  isStudentLogin: boolean = true;
  loginForm: FormGroup;

  constructor(
    private accService: AccountService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  togglePasswordHidden = () => {
    this.isPasswordHidden = !this.isPasswordHidden;
  };

  close = () => {
    this.dialogRef.close();
  };

  login = () => {
    if (this.loginForm.valid) {
      this.accService.login(this.loginForm.value).subscribe(
        (res: any) => {
          const user = {
            token: res.token,
            id: res.id,
            type: res.type,
          };
          localStorage.setItem('user', JSON.stringify(user));

          if (res.type == 'ADMIN') {
            this.router.navigate(['/admin/home']);
          } else if (res.type == 'STUDENT') {
            this.router.navigate(['/student/home']);
          } else if (res.type == 'PROFESSOR') {
            this.router.navigate(['/professor/home']);
          } else if (res.type == 'PARENT') {
            this.router.navigate(['/parent/home']);
          }
          this.dialogRef.close();
          this.loginForm.reset();
        },
        (error) => {
          this.isError = true;
          setTimeout(() => (this.isError = false), 3000);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  };

  forgot = () => {
    this.router.navigate(['/forgot-password/email']);
    this.close();
  };
}
