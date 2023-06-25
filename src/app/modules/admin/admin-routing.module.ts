import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { ProgramComponent } from './pages/program/program.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { StudentComponent } from './pages/student/student.component';

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
  {
    path: 'admin/parent',
    component: ParentComponent,
  },
  {
    path: 'admin/professor',
    component: ProfessorComponent,
  },
  {
    path: 'admin/student',
    component: StudentComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
