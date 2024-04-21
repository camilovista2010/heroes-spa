import { Component } from '@angular/core'; 
import { SharedModule } from '@shared/shared.module';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public hasHistory: boolean = false;


  constructor(
    private location: Location,
    private router: Router
  ){ 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url !== "/dashboard") {
          this.hasHistory = true;
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
 
}
