import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ApplyComponent } from './pages/apply/apply.component';

import { CourseListComponent } from './pages/course-list/course-list.component';
import { EducateLifeComponent } from './pages/educate-life/educate-life.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'educatelife', component: EducateLifeComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
