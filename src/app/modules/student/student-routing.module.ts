import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { StudentMainComponent } from './pages/student-main/student-main.component';
import { GradeComponent } from './pages/grade/grade.component';

const routes: Routes = [
  {
    path: '',
    component: StudentMainComponent,
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
        path: 'grades',
        component: GradeComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
