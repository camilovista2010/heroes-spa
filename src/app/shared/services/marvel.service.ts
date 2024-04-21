import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Character, ResponseCharacter } from '@shared/interfaces/character';
import { Observable, delay, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private baseUrl = environment.URL_API;

  public dataStore: Character[] = [];

  constructor(private http: HttpClient) {}

  getCharacters(params?: any): Observable<ApiResponse<ResponseCharacter>> {
    let queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiResponse<ResponseCharacter>>(`${this.baseUrl}/characters`, { params: queryParams });
  }

  getCharacterById(characterId: number): Observable<ApiResponse<ResponseCharacter>> {
    return this.http.get<ApiResponse<ResponseCharacter>>(`${this.baseUrl}/characters/${characterId}`);
  }

  getCharacterComics(characterId: number, params?: any): Observable<ApiResponse<Character[]>> {
    let queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiResponse<Character[]>>(`${this.baseUrl}/characters/${characterId}/comics`, { params: queryParams });
  }

  getCharacterEvents(characterId: number, params?: any): Observable<ApiResponse<Character[]>> {
    let queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiResponse<Character[]>>(`${this.baseUrl}/characters/${characterId}/events`, { params: queryParams });
  }
   

  getCharacterLocal() {
    return this.dataStore;
  }

  addCharacter(character: Character): Observable<Character> {
    return of(character).pipe(
      delay(1000), 
      tap(newCharacter => {
        newCharacter.id = this.dataStore.length + 1;
        this.dataStore = [newCharacter, ...this.dataStore ];
      })
    );
  }

  updateCharacter(updatedCharacter: Character): Observable<Character> {
    return of(updatedCharacter).pipe(
      delay(1000), 
      tap(character => {
        const index = this.dataStore.findIndex(item => item.id === character.id);
        if (index !== -1) {
          this.dataStore[index] = character;
        }
      })
    );
  }
  
}
