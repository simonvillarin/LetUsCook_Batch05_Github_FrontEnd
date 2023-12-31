import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './pages/program/program.component';
import { CourseComponent } from './pages/course/course.component';
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
import { MainComponent } from './pages/main/main.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SectionComponent } from './pages/section/section.component';
import { RoomComponent } from './pages/room/room.component';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadComponent } from './pages/load/load.component';
import { ProfessorModule } from '../professor/professor.module';
import { SectionLoadComponent } from './pages/section-load/section-load.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ProgramLoadComponent } from './pages/program-load/program-load.component';

@NgModule({
  declarations: [
    ProgramComponent,
    CourseComponent,
    HomeComponent,
    CurriculumComponent,
    ParentComponent,
    ProfessorComponent,
    StudentComponent,
    MainComponent,
    ProfileComponent,
    SectionComponent,
    RoomComponent,
    LoadComponent,
    SectionLoadComponent,
    AttendanceComponent,
    ProgramLoadComponent,
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
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ChipsModule,
    MultiSelectModule,
    KeyFilterModule,
    CalendarModule,
    TabViewModule,
    TooltipModule,
    MatTableModule,
    MatPaginatorModule,
    ProfessorModule,
  ],
})
export class AdminModule {}
