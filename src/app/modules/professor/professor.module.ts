import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GradeComponent } from './pages/grade/grade.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    HomeComponent,
    ScheduleComponent,
    GradeComponent,
    ProfileComponent,
  ],
  imports: [
    ProfessorRoutingModule,
    CommonModule,
    SharedModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
  ],
})
export class ProfessorModule {}
