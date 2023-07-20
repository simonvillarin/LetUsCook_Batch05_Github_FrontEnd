import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [NotFoundComponent, UnauthorizedComponent],
  imports: [CommonModule],
})
export class ErrorModule {}
