import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { EducateLifeComponent } from './pages/educate-life/educate-life.component';
import { StepsModule } from 'primeng/steps';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    LoginDialogComponent,
    ApplyComponent,
    FooterComponent,
    CourseListComponent,
    EducateLifeComponent,
    AboutComponent,
  ],
  imports: [
    LandingRoutingModule,
    CommonModule,
    SharedModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    KeyFilterModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class LandingModule {}
