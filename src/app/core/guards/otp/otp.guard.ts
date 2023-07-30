import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const otpGuard: CanActivateFn = (route, state) => {
  const otp = localStorage.getItem('otp');
  if (otp) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/403']);
    return false;
  }
};
