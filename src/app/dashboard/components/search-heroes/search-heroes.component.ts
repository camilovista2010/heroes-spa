import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Character } from '@shared/interfaces/character';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-search-heroes',
  standalone: true,
  imports: [SharedModule, FormsModule, RouterModule],
  templateUrl: './search-heroes.component.html',
  styleUrl: './search-heroes.component.scss',
})
export class SearchHeroesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SearchHeroesComponent>,
    private marvelService : MarvelService,
    private router: Router
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

  navigateToEdit(id: number) {
    this.router.navigate([`/dashboard/edit-heroe/${id}`]);
    this.onCloseClick();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
