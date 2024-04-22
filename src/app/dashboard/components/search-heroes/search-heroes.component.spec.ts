import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchHeroesComponent } from './search-heroes.component';
import { MarvelService } from '@shared/services/marvel.service';
import { SharedModule } from '@shared/shared.module';
import { CapitalizeFirstPipe } from '@shared/pipe/capitalize-first.pipe'; 
import { Router } from '@angular/router';

describe('SearchHeroesComponent', () => {
  let component: SearchHeroesComponent;
  let fixture: ComponentFixture<SearchHeroesComponent>;
  let marvelServiceMock: any;
  let dialogRefMock: any;
  let router: Router;

  beforeEach(async () => { 
    marvelServiceMock = {
      getCharacterLocal: jasmine.createSpy().and.returnValue([{ id: 1, name: 'Spider-Man' }, { id: 2, name: 'Iron Man' }])
    };
  

    dialogRefMock = {
      close: jasmine.createSpy('close') // Ensure this spy is correctly defined
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, RouterTestingModule, CapitalizeFirstPipe],
      providers: [
        { provide: MarvelService, useValue: marvelServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHeroesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on initialization', () => {
    expect(marvelServiceMock.getCharacterLocal).toHaveBeenCalled();
    expect(component.heroes.length).toBe(2);
  });

  it('should filter heroes based on search text', () => {
    component.searchText = 'iron';
    component.filterHeroes();
    expect(component.filteredHeroes.length).toBe(1);
    expect(component.filteredHeroes[0].name).toContain('Iron Man');
  });

  
});
