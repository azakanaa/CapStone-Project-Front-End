// login.component.ts
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

  errorMessage: string | null = null;

  constructor(private authSrv: AuthService, private router: Router) { }

  login(): void {
    this.errorMessage = null;
    this.authSrv.login(this.log).subscribe(
      (response) => {
        if (response.accessToken) {
          this.authSrv.setToken(response.accessToken);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Credenziali non valide';
        } else {
          this.errorMessage = 'Errore di autenticazione: ' + error.message;
        }
      }
    );
  }
}
