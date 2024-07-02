import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.interface';
import { CharactersService } from 'src/app/service/characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  favorites: Character[] = [];

  constructor(private charService: CharactersService) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.loadFavorites();
  }

  loadCharacters(): void {
    this.charService.getCharacters().subscribe(
      characters => {
        console.log(characters);  // Debug: stampa i dati caricati
        this.characters = characters;
      },
      error => {
        console.error('Error loading characters:', error);  // Debug: stampa eventuali errori
      }
    );
  }

  loadFavorites(): void {
    this.charService.getFavorites().subscribe(
      favorites => this.favorites = favorites,
      error => console.error('Error loading favorites:', error)
    );
  }

  isFavorite(character: Character): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  toggleFavorite(character: Character): void {
    this.charService.toggleFavorite(character);
    this.loadFavorites(); // Aggiorna i preferiti dopo la modifica
  }
}
