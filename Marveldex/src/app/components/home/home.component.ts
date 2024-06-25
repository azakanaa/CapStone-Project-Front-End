import { Component } from '@angular/core';
import { Character } from 'src/app/models/character.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  characters!: Character[];

  constructor(){
    this.getCharacters().then((data) => {
      this.characters = data;
      for (let i = 0; i < data.length; i++) {
        let id = this.characters[i].id;
        let nome = this.characters[i].nome;
        let cognome = this.characters[i].cognome;
        let alias = this.characters[i].alias;
        let immagine = this.characters[i].immagine;
        let razza = this.characters[i].razza;
        let descrizione = this.characters[i].descrizione;
        let interprete = this.characters[i].interprete;
        let arma = this.characters[i].arma;
        let apparizioni = this.characters[i].apparizioni;
        let abilita = this.characters[i].abilita;
        let inVita = this.characters[i].inVita;
      }
    })
  }

  async getCharacters(){
    const response = await fetch('../../../assets/db.json');
    const data = await response.json();
    return data;
  }

}
