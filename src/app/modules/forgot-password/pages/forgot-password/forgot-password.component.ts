import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  isResendDisabled: boolean = false;
  input1: string = '';

  onChangeInput1 = (e: any) => {
    console.log(e);
  };

  onSubmit = () => {
    console.log(this.onChangeInput1);
  };

  resendOTP = () => {};
}
