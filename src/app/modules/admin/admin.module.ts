import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './pages/program/program.component';
import { CourseComponent } from './pages/course/course.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    ProgramComponent,
    CourseComponent,
    ScheduleComponent,
    HomeComponent,
    CurriculumComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
