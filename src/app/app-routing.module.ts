import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin/admin.guard';
import { studentGuard } from './core/guards/student/student.guard';
import { professorGuard } from './core/guards/professor/professor.guard';
import { parentGuard } from './core/guards/parent/parent.guard';
import { UnauthorizedComponent } from './modules/error/components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './modules/error/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
    canActivate: [studentGuard],
  },
  {
    path: 'parent',
    loadChildren: () =>
      import('./modules/parent/parent.module').then((m) => m.ParentModule),
    canActivate: [parentGuard],
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./modules/professor/professor.module').then(
        (m) => m.ProfessorModule
      ),
    canActivate: [professorGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: '403',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
