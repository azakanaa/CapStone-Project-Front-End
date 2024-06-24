import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  sign = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
  }

  constructor(private authSrv: AuthService, private router: Router) {
  }

  signin(): void {
    this.authSrv.signup(this.sign).subscribe(
      (response) => {
        // Puoi salvare il token JWT o altre informazioni di risposta qui, se necessario
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Errore di autenticazione:', error);
        // Gestisci l'errore, mostra un messaggio all'utente, ecc.
      }
    );
  }
}
