import { Routes } from '@angular/router';


export const AUTH_ROUTES: Routes = [
  {
    path: 'log-in',
    loadComponent: () => import('./login-component/login-component').then(m => m.LoginComponent)
  },
];
