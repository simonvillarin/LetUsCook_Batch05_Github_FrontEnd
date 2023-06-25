import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './pages/program/program.component';
import { CourseComponent } from './pages/course/course.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ParentComponent } from './pages/parent/parent.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { StudentComponent } from './pages/student/student.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ProgramComponent,
    CourseComponent,
    ScheduleComponent,
    HomeComponent,
    CurriculumComponent,
    ParentComponent,
    ProfessorComponent,
    StudentComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MatIconModule, ChartModule],
})
export class AdminModule {}
