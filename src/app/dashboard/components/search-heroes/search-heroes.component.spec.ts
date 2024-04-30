import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchHeroesComponent } from './search-heroes.component';
import { MarvelService } from '@shared/services/marvel.service';
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing'; 
import { Character } from '@shared/interfaces/character';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
 
describe('SearchHeroesComponent', () => {
  let component: SearchHeroesComponent;
  let fixture: ComponentFixture<SearchHeroesComponent>;
  let marvelService: MarvelService;
  let dataSource: MatTableDataSource<Character>;
  let mockHeroes: Character[] = [];

  beforeEach(async () => {

    mockHeroes = [{
      name: 'Iron Man',
      id: 0,
      description: '',
      thumbnail: {
        path: '',
        extension: ''
      }
    }, {
      name: 'Captain America',
      id: 0,
      description: '',
      thumbnail: {
        path: '',
        extension: ''
      }
    }];

    const mockMarvelService = {
      getCharacterLocal: jasmine.createSpy('getCharacterLocal').and.returnValue(mockHeroes),
    }; 

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule , BrowserAnimationsModule, MatDialogModule], 
      providers: [
        { provide: MarvelService, useValue: mockMarvelService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHeroesComponent);
    component = fixture.componentInstance;
    // marvelService = TestBed.inject(MarvelService);
    dataSource = component.dataSource;
    fixture.detectChanges(); 
 
  });


  it('should get characters from MarvelService on ngOnInit', () => { 
    component.ngOnInit(); 
    expect(dataSource.data).toEqual(mockHeroes);
  });


  it('should set paginator and sort for dataSource on ngAfterViewInit', () => {
    const mockPaginator = jasmine.createSpyObj('MatPaginator', ['']);
    const mockSort = jasmine.createSpyObj('MatSort', ['']);
    fixture.componentInstance.paginator = mockPaginator;
    fixture.componentInstance.sort = mockSort;
  
    component.ngAfterViewInit();
  
    expect(dataSource.paginator).toBe(mockPaginator);
    expect(dataSource.sort).toBe(mockSort);
  });

 
 

  it('should close the dialog on onCloseClick', () => { 
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    fixture.componentInstance.dialogRef = mockDialogRef;
  
    component.onCloseClick();
  
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
  
  
  
  
});
