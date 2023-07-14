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
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SectionComponent } from './pages/section/section.component';
import { RoomComponent } from './pages/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
        path: 'curriculum',
        component: CurriculumComponent,
      },
      {
        path: 'program',
        component: ProgramComponent,
      },
      {
        path: 'professor/sched/:id',
        component: ScheduleComponent,
      },
      {
        path: 'parent',
        component: ParentComponent,
      },
      {
        path: 'professor',
        component: ProfessorComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'section',
        component: SectionComponent,
      },
      {
        path: 'room',
        component: RoomComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
