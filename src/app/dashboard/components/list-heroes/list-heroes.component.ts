import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterFormComponent } from '@shared/components/character-form/character-form.component';
import { Character } from '@shared/interfaces/character';
import { AlertService } from '@shared/services/alert.service';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-heroes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-heroes.component.html',
  styleUrl: './list-heroes.component.scss'
})
export class ListHeroesComponent implements OnInit  {

  characters: Character[] = [];

  constructor(
    public dialog: MatDialog,
    private marvelService: MarvelService,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.marvelService.getCharacters()
    .pipe(
      map(response => {
        for (const item of response.data.results) {
          item.thumbnail.path += `.${item.thumbnail.extension}`;
        }
        return response;
      })
    )
    .subscribe(response => {
      this.characters = response.data.results;
      this.marvelService.dataStore = response.data.results;
    });
  }

  addHero() {
    const dialogRef = this.dialog.open(CharacterFormComponent, {
      data: {},
    });

    dialogRef.componentInstance.onReceiveData.subscribe(response => {
      this.marvelService.addCharacter(response).subscribe({
        next : (item ) => {
          this.characters =  this.marvelService.getCharacterLocal();
          this.alertService.showSuccess('Heroe agregado.');
        },
        error: (err) => {
          this.alertService.showError(err);
        },
        complete: () => {
          dialogRef.close();
        }
      })
      console.log(response)
      
    }); 
  }
    


}
