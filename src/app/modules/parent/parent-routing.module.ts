import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { GradesComponent } from './pages/grades/grades.component';
const routes: Routes = [
  {
    path: 'parent/home',
    component: HomeComponent,
  },
  {
    path: 'parent/grades',
    component: GradesComponent,
  },
  {
    path: 'parent/attendance',
    component: AttendanceComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}
