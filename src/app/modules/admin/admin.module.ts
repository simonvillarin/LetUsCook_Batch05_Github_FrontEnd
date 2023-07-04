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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MatDialogModule } from '@angular/material/dialog';
import { MainComponent } from './pages/main/main.component';
import { CurriculumDialogComponent } from './components/curriculum-dialog/curriculum-dialog.component';
import { ProgramDialogComponent } from './components/program-dialog/program-dialog.component';

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
    MainComponent,
    CurriculumDialogComponent,
    ProgramDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    ChartModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    MatDialogModule,
  ],
})
export class AdminModule {}
