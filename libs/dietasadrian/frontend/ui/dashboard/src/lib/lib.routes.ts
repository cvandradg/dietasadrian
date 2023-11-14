import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Route[] = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('@libs/client/lib.routes').then(r => r.routes)
      }
    ]
  },
];
