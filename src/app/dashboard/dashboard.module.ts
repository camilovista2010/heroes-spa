import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { RoutesDasboard } from './dashboard.routes';
import { NavbarComponent } from '../_layout/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListHeroesComponent } from './components/list-heroes/list-heroes.component';
import { EditHeroeComponent } from './components/edit-heroe/edit-heroe.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  providers: [provideRouter(RoutesDasboard), provideAnimationsAsync(), HttpClientModule],
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    ListHeroesComponent,
    EditHeroeComponent,
    NavbarComponent,
    CommonModule
  ]
})
export class DashboardModule { }
