import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesComponent } from './pages/grades/grades.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HomeComponent } from './pages/home/home.component';
import { ParentRoutingModule } from './parent-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [GradesComponent, AttendanceComponent, HomeComponent],
  imports: [ParentRoutingModule, CommonModule, SharedModule],
})
export class ParentModule {}
