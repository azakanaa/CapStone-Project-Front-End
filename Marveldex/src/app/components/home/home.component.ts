import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getCharacters().then((data) => {
      console.log(data);  // Debug: stampa i dati caricati
      this.characters = data;
    }).catch((error) => {
      console.error('Error loading characters:', error);  // Debug: stampa eventuali errori
    });
  }

  async getCharacters(): Promise<Character[]> {
    const response = await fetch('../../../assets/db.json');  // Assicurati che il percorso sia corretto
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }

}
