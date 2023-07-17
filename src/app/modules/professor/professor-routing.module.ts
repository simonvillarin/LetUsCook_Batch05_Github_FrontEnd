import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentEvaluationComponent } from './pages/student-evaluation/student-evaluation.component';
import { ProfMainComponent } from './pages/prof-main/prof-main.component';
import { CourseComponent } from './pages/course/course.component';

const routes: Routes = [
  {
    path: '',
    component: ProfMainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'evaluation',
        component: StudentEvaluationComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
