import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';

@Component({
  selector: 'app-account-utente',
  imports: [],
  templateUrl: './account-utente.component.html',
  styleUrl: './account-utente.component.css'
})
export class AccountUtenteComponent {

private authService:AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);
  constructor() { 
    
    effect(() => {
      const user = this.authService.currentUser();
    if(user){
      console.log('Utente loggato:', user);
      this.currentUser.set(user);
    }else{
      console.log('Utente non loggato');
    }
    });
  
  }

}
