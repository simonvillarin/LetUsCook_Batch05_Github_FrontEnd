import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const studentGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user && JSON.parse(user).type === 'STUDENT') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/403']);
    return false;
  }
};
