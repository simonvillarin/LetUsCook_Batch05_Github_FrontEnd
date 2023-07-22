import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CardModule } from 'primeng/card';
import { StudentEvaluationComponent } from './pages/student-evaluation/student-evaluation.component';
import { EvaluationDialogComponent } from './components/evaluation-dialog/evaluation-dialog.component';
import { EvaluationFormDialogComponent } from './components/evaluation-form-dialog/evaluation-form-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfMainComponent } from './pages/prof-main/prof-main.component';
import { CourseComponent } from './pages/course/course.component';
import { TabViewModule } from 'primeng/tabview';
import { LoadComponent } from './pages/load/load.component';

@NgModule({
  declarations: [
    HomeComponent,
    ScheduleComponent,
    ProfileComponent,
    EditDialogComponent,
    UploadDialogComponent,
    StudentEvaluationComponent,
    EvaluationDialogComponent,
    EvaluationFormDialogComponent,
    ProfMainComponent,
    CourseComponent,
    LoadComponent,
  ],
  imports: [
    ProfessorRoutingModule,
    CommonModule,
    SharedModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    MatDialogModule,
    FullCalendarModule,
    CardModule,
    InputTextareaModule,
    TabViewModule,
  ],
})
export class ProfessorModule {}
