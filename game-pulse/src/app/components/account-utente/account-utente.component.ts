import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common'; // <-- Importa CurrencyPipe e NgIf
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';

@Component({
  selector: 'app-account-utente',
  standalone: true,
  imports: [CurrencyPipe, NgIf], // <-- Aggiungi qui CurrencyPipe e NgIf
  templateUrl: './account-utente.component.html',
  styleUrl: './account-utente.component.css'
})
export class AccountUtenteComponent {
  private authService: AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);


  constructor() { 
    effect(() => {
      const user = this.authService.currentUser();  // questo dovrebbe restituire i dati anche dopo un nuovo login
      if (user) {
        console.log('Utente loggato:', user);
        this.currentUser.set(user);
      } else {
        console.log('Utente non loggato');
        this.currentUser.set(null); // importante anche per l'effetto reactive
      }
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.currentUser.set(null);
  }
  
  
}
