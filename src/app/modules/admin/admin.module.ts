import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgramComponent } from './pages/program/program.component';
import { CourseComponent } from './pages/course/course.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgramComponent,
    CourseComponent,
    CurriculumComponent,
    ScheduleComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
