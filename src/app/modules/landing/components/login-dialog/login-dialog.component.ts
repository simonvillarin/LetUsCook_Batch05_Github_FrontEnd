import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  hide: boolean = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private accService: AccountService) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onClickLogin = () => {
    if (this.loginForm.valid) {
      console.log('getting service');
      console.log(this.loginForm.value);
      this.accService.login(this.loginForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  };
}
