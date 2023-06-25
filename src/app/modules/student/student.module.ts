import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';



@NgModule({
  declarations: [
    HomeComponent,
    CourseComponent,
    ScheduleComponent,
    CurriculumComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentModule { }
