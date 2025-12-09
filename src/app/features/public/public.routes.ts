import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: 'acuerdo/:id',
    loadComponent: () =>
      import('../public/acuerdo/acuerdo').then((m) => m.Acuerdo),
  },
];
