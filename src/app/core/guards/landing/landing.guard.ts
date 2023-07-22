import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const landingGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) {
    const router = inject(Router);
    if (user && JSON.parse(user).type === 'ADMIN') {
      router.navigate(['/admin/home']);
    } else if (user && JSON.parse(user).type === 'PROFESSOR') {
      router.navigate(['/professor/home']);
    } else if (user && JSON.parse(user).type === 'STUDENT') {
      router.navigate(['/student/home']);
    } else if (user && JSON.parse(user).type === 'PARENT') {
      router.navigate(['/parent/home']);
    }
    return false;
  } else {
    return true;
  }
};
