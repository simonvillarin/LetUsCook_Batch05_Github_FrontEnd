import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { ProgramComponent } from './pages/program/program.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { StudentComponent } from './pages/student/student.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SectionComponent } from './pages/section/section.component';
import { RoomComponent } from './pages/room/room.component';
import { LoadComponent } from './pages/load/load.component';
import { SectionLoadComponent } from './pages/section-load/section-load.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ProgramLoadComponent } from './pages/program-load/program-load.component';

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
        path: 'program/:program',
        component: ProgramLoadComponent,
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
      {
        path: 'professor/schedule/:id',
        component: LoadComponent,
      },
      {
        path: 'section/:section',
        component: SectionLoadComponent,
      },
      {
        path: 'section/attendance/:id',
        component: AttendanceComponent,
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
