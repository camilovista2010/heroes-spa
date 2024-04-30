import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Character } from '@shared/interfaces/character';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';
import { CapitalizeFirstPipe } from "@shared/pipe/capitalize-first.pipe";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-search-heroes',
  standalone: true,
  imports: [SharedModule, FormsModule, RouterModule, CapitalizeFirstPipe],
  templateUrl: './search-heroes.component.html',
  styleUrl: './search-heroes.component.scss',
})
export class SearchHeroesComponent implements OnInit , AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<SearchHeroesComponent>,
    private marvelService : MarvelService,
    private router: Router
    ) {}

  displayedColumns: string[] = ['avatar', 'name', 'description' ];
  dataSource = new MatTableDataSource<Character>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  heroes: Character[] = [];  

  ngOnInit(): void {
    this.heroes = this.marvelService.getCharacterLocal();
    this.dataSource.data = this.heroes; 
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  navigateToEdit(id: number) {
    this.router.navigate([`/dashboard/edit-heroe/${id}`]);
    this.onCloseClick();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
