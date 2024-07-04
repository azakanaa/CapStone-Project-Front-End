import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.interface';
import { CharactersService } from 'src/app/service/characters.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Character[] = [];
  isModalOpen = false;
  selectedCharacter: Character | null = null;
  isVitaVisible = false;

  constructor(private charService: CharactersService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  isFavorite(character: Character): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  loadFavorites(): void {
    this.charService.getFavorites().subscribe(
      favorites => this.favorites = favorites,
      error => console.error('Error loading favorites:', error)
    );
  }

  removeFromFavorites(character: Character): void {
    this.charService.toggleFavorite(character);
    this.loadFavorites(); // Ricarica i preferiti dopo la modifica
  }

  openModal(character: Character): void {
    this.selectedCharacter = character;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  toggleVitaVisibility() {
    this.isVitaVisible = !this.isVitaVisible;
  }
}
