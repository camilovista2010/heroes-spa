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
  styleUrls: ['./list-heroes.component.scss']
})
export class ListHeroesComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    private dialog: MatDialog,
    private marvelService: MarvelService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  private loadCharacters(): void {
    this.marvelService.getCharacterLocal().length > 0 ? this.characters = this.marvelService.getCharacterLocal() : this.fetchCharacters();
  }

  private fetchCharacters(): void {
    this.marvelService.getCharacters().pipe(
      map(response => this.formatCharacterThumbnails(response))
    ).subscribe({
      next: response => this.handleCharacterResponse(response),
      error: err => this.alertService.showError(err)
    });
  }

  private formatCharacterThumbnails(response: any): any {
    response.data.results.forEach((item: any) => {
      item.thumbnail.path += `.${item.thumbnail.extension}`;
    });
    return response;
  }

  private handleCharacterResponse(response: any): void {
    this.characters = response.data.results;
    this.marvelService.dataStore = this.characters;
  }

  addHero(): void {
    const dialogRef = this.dialog.open(CharacterFormComponent, { data: {} });
    this.handleDialogClose(dialogRef);
  }

  private handleDialogClose(dialogRef: any): void {
    dialogRef.componentInstance.onReceiveData.subscribe((response : Character) => {
      this.marvelService.addCharacter(response).subscribe({
        next: () => {
          this.characters = this.marvelService.getCharacterLocal();
          this.alertService.showSuccess('Heroe agregado.');
        },
        error: err => this.alertService.showError(err),
        complete: () => dialogRef.close()
      });
    });
  }
}