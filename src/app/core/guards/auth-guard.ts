import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const autenticado = authService.estaAutenticado();

  if (autenticado) return true;

  return router.createUrlTree(['/auth/log-in'], {
    queryParams: { returnUrl: state.url },
  });
};
