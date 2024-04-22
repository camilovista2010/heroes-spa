import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ListHeroesComponent } from './list-heroes.component';
import { MarvelService } from '@shared/services/marvel.service';
import { AlertService } from '@shared/services/alert.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListHeroesComponent', () => {
  let component: ListHeroesComponent;
  let fixture: ComponentFixture<ListHeroesComponent>;
  let marvelServiceMock: any;
  let alertServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    marvelServiceMock = {
      getCharacterLocal: jasmine.createSpy().and.returnValue([]),
      getCharacters: jasmine.createSpy().and.returnValue(of({ data: { results: [] } })),
      addCharacter: jasmine.createSpy().and.returnValue(of({})),
      dataStore: []
    };

    alertServiceMock = {
      showError: jasmine.createSpy('showError'),
      showSuccess: jasmine.createSpy('showSuccess')
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ 
        componentInstance: { onReceiveData: of({}) },
        close: jasmine.createSpy('close')
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        SharedModule, RouterModule, CommonModule
      ], 
      providers: [
        { provide: MarvelService, useValue: marvelServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust slidesPerView based on window width', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.adjustSlidesPerView();
    expect(component.slidesPerView).toBe(5);  
  });

  it('should load characters from local store if available', () => {
    marvelServiceMock.getCharacterLocal.and.returnValue([{ id: 1, name: 'Iron Man' }]);
    component.loadCharacters();
    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Iron Man');
  });

  it('should fetch characters if local store is empty', () => {
    component.loadCharacters();
    expect(marvelServiceMock.getCharacters).toHaveBeenCalled();
  });

});
