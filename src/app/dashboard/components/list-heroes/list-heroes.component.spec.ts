import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ListHeroesComponent } from './list-heroes.component';
import { MarvelService } from '@shared/services/marvel.service';
import { AlertService } from '@shared/services/alert.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Character } from '@shared/interfaces/character';

describe('ListHeroesComponent', () => {
  let component: ListHeroesComponent;
  let fixture: ComponentFixture<ListHeroesComponent>;
  let mockMarvelService: jasmine.SpyObj<MarvelService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
  mockDialogRef.afterClosed.and.returnValue(of({}));

  beforeEach(async () => {
    

    mockMarvelService = jasmine.createSpyObj('MarvelService', ['getCharacterLocal', 'getCharacters', 'addCharacter']);
    mockAlertService = jasmine.createSpyObj('AlertService', ['showError', 'showSuccess']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      declarations: [ ListHeroesComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MarvelService, useValue: mockMarvelService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar personajes al iniciar', () => {
    const characters : Character[] = [{ id: 1, name: 'Spider-Man', description: 'Swings around New York' , thumbnail : { path : '' , extension : ''}}];
    mockMarvelService.getCharacterLocal.and.returnValue(characters);
    component.ngOnInit();
    expect(component.characters.length).toBeGreaterThan(0);
  });

  

  // it('debería abrir un diálogo para añadir un héroe', () => {
  //   const dialogSpy2 = mockDialog.open.and.returnValue(of({}));
  //   const dialogSpy = mockDialog.open.and.returnValue({ afterClosed: () => of({ data: { id: 2, name: 'Iron Man' } }) });
  //   component.addHero();
  //   expect(dialogSpy).toHaveBeenCalled();
  // });

  it('debería manejar el cierre del diálogo y añadir un héroe', () => {
    const response : Character = {
      id: 2, name: 'Iron Man', thumbnail: { path: '', extension: '' },
      description: ''
    };
    // const dialogCloseSpy = mockDialog.open.and.returnValue({ componentInstance: { onReceiveData: of(response) } });
    mockMarvelService.addCharacter.and.returnValue(of(response));

    component.addHero();
    // expect(dialogCloseSpy).toHaveBeenCalled();
    expect(mockMarvelService.addCharacter).toHaveBeenCalledWith(response);
  });
});
