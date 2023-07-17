import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const professorGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user && JSON.parse(user).type === 'PROFESSOR') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/']);
    return false;
  }
};
