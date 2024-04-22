import { Component } from '@angular/core'; 
import { SharedModule } from '@shared/shared.module';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SearchHeroesComponent } from 'src/app/dashboard/components/search-heroes/search-heroes.component';

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
    private router: Router,
    private dialog: MatDialog,
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


  searchHeroes() {
    const dialogRef = this.dialog.open(SearchHeroesComponent, {
      width : '60%',
      height: '60%'
    }); 
  }
 
}
