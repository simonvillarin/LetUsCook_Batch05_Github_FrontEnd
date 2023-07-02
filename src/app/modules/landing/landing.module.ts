import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { StepsModule } from 'primeng/steps';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    LoginDialogComponent,
    ApplyComponent,
    FooterComponent,
  ],
  imports: [
    LandingRoutingModule,
    CommonModule,
    SharedModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LandingModule {}
