import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private jsonUrl = 'assets/db.json';
  private favorites: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>(this.getFavoritesFromLocalStorage());

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.jsonUrl);
  }

  toggleFavorite(character: Character): void {
    const currentFavorites = this.favorites.getValue();
    const characterIndex = currentFavorites.findIndex(c => c.id === character.id);

    if (characterIndex === -1) {
      // Aggiungi ai preferiti
      this.favorites.next([...currentFavorites, character]);
    } else {
      // Rimuovi dai preferiti
      this.favorites.next(currentFavorites.filter(c => c.id !== character.id));
    }

    this.saveFavoritesToLocalStorage(this.favorites.getValue());
  }

  getFavorites(): Observable<Character[]> {
    return this.favorites.asObservable();
  }

  private getFavoritesFromLocalStorage(): Character[] {
    const favoritesJson = localStorage.getItem('favorites');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  private saveFavoritesToLocalStorage(favorites: Character[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
