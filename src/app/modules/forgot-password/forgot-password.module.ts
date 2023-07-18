import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule, SharedModule],
})
export class ForgotPasswordModule {}
