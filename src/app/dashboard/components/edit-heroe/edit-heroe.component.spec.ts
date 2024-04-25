import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { EditHeroeComponent } from './edit-heroe.component'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from '@shared/services/marvel.service';
import { AlertService } from '@shared/services/alert.service';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from 'src/app/_layout/navbar/navbar.component'; 
import { Character } from '@shared/interfaces/character'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('EditHeroeComponent', () => {
  let component: EditHeroeComponent;
  let fixture: ComponentFixture<EditHeroeComponent>;
  let marvelService: MarvelService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockActivatedRoute = {
    snapshot: {
      params: {
        'id': '1'
      }
    }
  };


  const mockMarvelService = {
    getCharacterLocal: jasmine.createSpy('getCharacterLocal').and.returnValue([{ id: 1, name: 'Spider-Man' }]),
    updateCharacter: jasmine.createSpy('updateCharacter').and.returnValue({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [  
        SharedModule, 
        NavbarComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MarvelService, useValue: mockMarvelService },
        provideAnimations(),
        AlertService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroeComponent);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct hero id from activated route', () => {
    expect(component.idHeroes).toEqual(1);
  });

  it('should load character data on initialization', () => {
    expect(marvelService.getCharacterLocal).toHaveBeenCalled();
    expect(component.prospCharacters.name).toEqual('Spider-Man');
  });

  it('should navigate to home after updating character data', fakeAsync(() => {
    spyOn(router, 'navigateByUrl');
    const character: Character = {
      id: 1, name: 'Iron Man',
      description: '',
      thumbnail: {
        path: '',
        extension: ''
      }
    };

    component.onReceiveData(character);
    tick();

    expect(marvelService.updateCharacter).toHaveBeenCalledWith(character);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  }));
});

