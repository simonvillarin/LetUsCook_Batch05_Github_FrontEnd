import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isStaffLogin: boolean = false;
  isError: boolean = false;
  isStudentLogin: boolean = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accService: AccountService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordHidden = () => {
    this.isPasswordHidden = !this.isPasswordHidden;
  };

  toggleStaffLogin = () => {
    this.isStaffLogin = !this.isStaffLogin;
    this.isStudentLogin = !this.isStudentLogin;
  };

  close = () => {
    this.dialogRef.close();
  };

  login = () => {
    if (this.loginForm.valid) {
      this.accService.login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res);
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
        },
        (error) => {
          if (error.status === 403) {
            this.isError = true;
            setTimeout(() => (this.isError = false), 3000);
          }
        }
      );
      this.dialogRef.close();
    }
    this.loginForm.reset();
  };
}
