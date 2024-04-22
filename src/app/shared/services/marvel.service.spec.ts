import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelService } from './marvel.service';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Character, ResponseCharacter } from '@shared/interfaces/character';
import { environment } from 'src/environments/environment';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelService]
    });
    service = TestBed.inject(MarvelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar personajes usando GET', () => {
    const mockCharacters: ApiResponse<ResponseCharacter> = {
      data: {
        count: 1,
        results: [{ id: 1011334, name: '3-D Man', description: '', thumbnail: { path: '', extension: '' } }],
        limit: 0,
        offset: 0,
        total: 0
      },
      code: 200,
      status: 'Ok'
    };

    service.getCharacters().subscribe(characters => {
      expect(characters.data.results.length).toBe(1);
      expect(characters.data.results[0].name).toEqual('3-D Man');
    });

    const req = httpMock.expectOne(`${environment.URL_API}/characters`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters);
  });

  it('debería añadir un personaje localmente', () => {
    const newCharacter: Character = {
      name: 'New Hero', description: 'Newly added hero',
      id: 0,
      thumbnail: {
        path: '',
        extension: ''
      }
    };
    service.addCharacter(newCharacter).subscribe(character => {
      expect(character.id).not.toBeNull();
      expect(service.dataStore).toContain(character);
    });
  });

  it('debería actualizar un personaje localmente', () => {
    const updatedCharacter: Character = {
      id: 1, name: 'Updated Hero', description: 'Updated description',
      thumbnail: {
        path: '',
        extension: ''
      }
    };
    service.updateCharacter(updatedCharacter).subscribe(character => {
      expect(service.dataStore.find(x => x.id === character.id)).toEqual(character);
    });
 
    service.dataStore = [updatedCharacter];
  });
});