import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesComponent } from './pages/grades/grades.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    GradesComponent,
    AttendanceComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ParentModule { }
