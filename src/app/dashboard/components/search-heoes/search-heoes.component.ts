import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from '@shared/interfaces/character';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-search-heoes',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './search-heoes.component.html',
  styleUrl: './search-heoes.component.scss',
})
export class SearchHeoesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SearchHeoesComponent>,
    private marvelService : MarvelService
    ) {}

  heroes: Character[] = [];
  filteredHeroes: Character[] = [...this.heroes];
  searchText = '';

  ngOnInit(): void {
    this.heroes = this.marvelService.getCharacterLocal();
  }

  filterHeroes() {
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
