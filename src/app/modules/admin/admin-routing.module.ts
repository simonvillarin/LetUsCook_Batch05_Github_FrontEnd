import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { ProgramComponent } from './pages/program/program.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  {
    path: 'admin/home',
    component: HomeComponent,
  },
  {
    path: 'admin/course',
    component: CourseComponent,
  },
  {
    path: 'admin/curriculum',
    component: CurriculumComponent,
  },
  {
    path: 'admin/program',
    component: ProgramComponent,
  },
  {
    path: 'admin/schedule',
    component: ScheduleComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
