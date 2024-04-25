import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@shared/interfaces/character';
import { AlertService } from '@shared/services/alert.service';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';
import { lastValueFrom } from 'rxjs';
import { NavbarComponent } from 'src/app/_layout/navbar/navbar.component'; 


@Component({
  selector: 'app-edit-heroe',
  standalone: true,
  imports: [SharedModule , NavbarComponent],
  templateUrl: './edit-heroe.component.html',
  styleUrl: './edit-heroe.component.scss',
})
export class EditHeroeComponent {

  idHeroes = 0;
  prospCharacters!: Character; 

  constructor(
    private marvelService: MarvelService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {
    this.idHeroes = Number(this.activatedRoute.snapshot.params['id']);

    this.marvelService.getCharacterLocal()
    .filter(item => item.id === this.idHeroes).forEach(response => {
      this.prospCharacters = response;
    });
  } 

  onReceiveData(event: Character) { 
   this.marvelService.updateCharacter(event).subscribe({
      next: characte => {
        this.alertService.showSuccess(`heroe ${characte.name} se encuentra actualizado.`)
        this.router.navigateByUrl('/');
      },
      error: err => this.alertService.showError(err)
    });
   
  }


}
