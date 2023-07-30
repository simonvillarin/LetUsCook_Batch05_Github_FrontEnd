import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const resetGuard: CanActivateFn = (route, state) => {
  const reset = localStorage.getItem('reset');
  if (reset) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/403']);
    return false;
  }
};
