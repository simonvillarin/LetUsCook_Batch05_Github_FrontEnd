import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [{ path: 'otp', component: ForgotPasswordComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
