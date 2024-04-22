import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CharacterFormComponent } from '@shared/components/character-form/character-form.component';
import { Character } from '@shared/interfaces/character';
import { AlertService } from '@shared/services/alert.service';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';
import { map } from 'rxjs';   
import { register } from 'swiper/element/bundle';

 
register();


@Component({
  selector: 'app-list-heroes',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListHeroesComponent implements OnInit {
  
  characters: Character[] = [];

  slidesPerView: number = 10;

  constructor(
    private dialog: MatDialog,
    private marvelService: MarvelService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
    this.adjustSlidesPerView();
  }

  adjustSlidesPerView() {
    const screenWidth = window.innerWidth;
    const breakpoints = [350, 400, 500, 600, 700, 800, 900, 1000];
    let index = breakpoints.findIndex(breakpoint => screenWidth < breakpoint);
 
    this.slidesPerView = index === -1 ? 10 : index + 2;

    console.log(this.slidesPerView);
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