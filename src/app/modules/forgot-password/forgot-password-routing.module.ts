import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmailInputComponent } from './pages/email-input/email-input.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotMainComponent } from './pages/forgot-main/forgot-main.component';
import { OtpComponent } from './pages/otp/otp.component';
import { otpGuard } from 'src/app/core/guards/otp/otp.guard';
import { resetGuard } from 'src/app/core/guards/reset/reset.guard';

const routes: Routes = [
  {
    path: '',
    component: ForgotMainComponent,
    children: [
      { path: 'email', component: EmailInputComponent },
      { path: 'otp', component: OtpComponent, canActivate: [otpGuard] },
      {
        path: 'reset',
        component: ResetPasswordComponent,
        canActivate: [resetGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
