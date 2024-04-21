import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditHeroeComponent } from './components/edit-heroe/edit-heroe.component';
import { AuthGuard } from '@shared/guards/auth.guard';

export const RoutesDasboard: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'edit-heroe/:id', component: EditHeroeComponent, data: {animation: 'insertRemovePage'} , canActivate: [AuthGuard]},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  }
];
