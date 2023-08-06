import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { GradesComponent } from './pages/grades/grades.component';
import { ParentMainComponent } from './pages/parent-main/parent-main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentGradeComponent } from './pages/student-grade/student-grade.component';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
const routes: Routes = [
  {
    path: '',
    component: ParentMainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'grades',
        component: GradesComponent,
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'grades/:id',
        component: StudentGradeComponent,
      },
      {
        path: 'attendance/:id',
        component: StudentAttendanceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}
