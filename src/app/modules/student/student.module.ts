import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { StudentRoutingModule } from './student-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentMainComponent } from './pages/student-main/student-main.component';
import { GradeComponent } from './pages/grade/grade.component';

@NgModule({
  declarations: [
    HomeComponent,
    CourseComponent,
    ScheduleComponent,
    StudentMainComponent,
    GradeComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatIconModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ChartModule,
    FullCalendarModule,
    CardModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class StudentModule {}
