import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CardModule } from 'primeng/card';
import { StudentEvaluationComponent } from './pages/student-evaluation/student-evaluation.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfMainComponent } from './pages/prof-main/prof-main.component';
import { CourseComponent } from './pages/course/course.component';
import { TabViewModule } from 'primeng/tabview';
import { LoadComponent } from './pages/load/load.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AttendanceComponent } from './pages/attendance/attendance.component';

@NgModule({
  declarations: [
    HomeComponent,
    ScheduleComponent,
    ProfileComponent,
    StudentEvaluationComponent,
    ProfMainComponent,
    CourseComponent,
    LoadComponent,
    AttendanceComponent,
  ],
  imports: [
    ProfessorRoutingModule,
    CommonModule,
    SharedModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    MatDialogModule,
    CalendarModule,
    FullCalendarModule,
    CardModule,
    InputTextareaModule,
    TabViewModule,
    KeyFilterModule,
  ],
  providers: [DatePipe],
})
export class ProfessorModule {}
