import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GradeComponent } from './pages/grade/grade.component';



@NgModule({
  declarations: [
    HomeComponent,
    ScheduleComponent,
    GradeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfessorModule { }
