import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesComponent } from './pages/grades/grades.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HomeComponent } from './pages/home/home.component';
import { ParentRoutingModule } from './parent-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParentMainComponent } from './pages/parent-main/parent-main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentGradeComponent } from './pages/student-grade/student-grade.component';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
@NgModule({
  declarations: [
    GradesComponent,
    AttendanceComponent,
    HomeComponent,
    ParentMainComponent,
    ProfileComponent,
    StudentGradeComponent,
    StudentAttendanceComponent,
  ],
  imports: [ParentRoutingModule, CommonModule, SharedModule],
})
export class ParentModule {}
