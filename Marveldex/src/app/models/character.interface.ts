export interface Character {
    id: number;
    nome: string;
    cognome: string;
    alias: string;
    immagine: string;
    razza: string;
    descrizione: string;
    interprete: string;
    arma: string;
    apparizioni: Array<string>;
    abilita: Array<string>;
    inVita: boolean;
}