import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/parent/parent.module').then((m) => m.ParentModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/professor/professor.module').then(
        (m) => m.ProfessorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
