import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailInputComponent } from './pages/email-input/email-input.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotMainComponent } from './pages/forgot-main/forgot-main.component';
import { LandingModule } from '../landing/landing.module';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    EmailInputComponent,
    ResetPasswordComponent,
    ForgotMainComponent,
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    LandingModule,
    KeyFilterModule,
  ],
})
export class ForgotPasswordModule {}
