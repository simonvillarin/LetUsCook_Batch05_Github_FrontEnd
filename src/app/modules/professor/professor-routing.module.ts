import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GradeComponent } from './pages/grade/grade.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentEvaluationComponent } from './pages/student-evaluation/student-evaluation.component';

const routes: Routes = [
  {
    path: 'professor/home',
    component: HomeComponent,
  },
  {
    path: 'professor/grade',
    component: GradeComponent,
  },
  {
    path: 'professor/schedule',
    component: ScheduleComponent,
  },
  {
    path: 'professor/profile',
    component: ProfileComponent,
  },
  {
    path: 'professor/evaluation',
    component: StudentEvaluationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
