import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditHeroeComponent } from './components/edit-heroe/edit-heroe.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { ListHeroesComponent } from './components/list-heroes/list-heroes.component';

export const RoutesDasboard = [
  provideRouter(
    [
      {
        path: 'dashboard',
        children : [
          {
            path: '',
            component: ListHeroesComponent,
            pathMatch: 'full',
          },
          {
            path: 'edit-heroe/:id',
            component: EditHeroeComponent,
            canActivate: [AuthGuard],
            pathMatch: 'full',
          },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    withViewTransitions(),
    withComponentInputBinding()
  ),
];
