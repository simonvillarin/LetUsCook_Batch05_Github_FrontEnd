import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmailInputComponent } from './pages/email-input/email-input.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotMainComponent } from './pages/forgot-main/forgot-main.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotMainComponent,
    children: [{ path: '', component: EmailInputComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
