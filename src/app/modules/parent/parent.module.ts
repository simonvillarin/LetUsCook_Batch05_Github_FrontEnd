import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesComponent } from './pages/grades/grades.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HomeComponent } from './pages/home/home.component';
import { ParentRoutingModule } from './parent-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParentMainComponent } from './pages/parent-main/parent-main.component';
@NgModule({
  declarations: [GradesComponent, AttendanceComponent, HomeComponent, ParentMainComponent],
  imports: [ParentRoutingModule, CommonModule, SharedModule],
})
export class ParentModule {}
