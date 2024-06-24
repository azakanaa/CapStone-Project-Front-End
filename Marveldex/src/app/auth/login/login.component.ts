import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  log = {
    username: '',
    password: ''
  };

  constructor(private authSrv: AuthService, private router: Router) { }

  login(): void {
    this.authSrv.login(this.log).subscribe(
      (response) => {
       
        if (response.accessToken) {
          this.authSrv.setToken(response.accessToken);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        // Gestione degli errori di autenticazione
      if (error.status === 403) {
        console.error('Accesso negato: credenziali non valide o autorizzazione insufficiente');
        // Mostra un messaggio all'utente o gestisci l'errore di conseguenza
        // Esempio:
        // this.errorMessage = 'Credenziali non valide';
      } else {
        console.error('Errore di autenticazione:', error.message);
        // Gestione generica degli altri errori di autenticazione
      }
      }
    );
  }
}
