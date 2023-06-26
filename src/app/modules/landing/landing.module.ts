import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ApplyComponent } from './pages/apply/apply.component';

@NgModule({
  declarations: [LandingComponent, HeaderComponent, LoginDialogComponent, ApplyComponent],
  imports: [LandingRoutingModule, CommonModule, SharedModule],
})
export class LandingModule {}
