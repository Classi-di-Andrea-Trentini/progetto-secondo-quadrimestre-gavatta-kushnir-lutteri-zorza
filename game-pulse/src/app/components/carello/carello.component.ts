import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-carello',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './carello.component.html',
  styleUrl: './carello.component.css'
})
export class CarelloComponent {
  private authService: AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);
  private router = inject(Router);


    constructor(private http: HttpClient) { 
    effect(() => {
      const user = this.authService.currentUser();  // questo dovrebbe restituire i dati anche dopo un nuovo login
      if (user) {
        console.log('Utente loggato:', user);
        this.currentUser.set(user);
      } else {
        console.log('Utente non loggato');
        this.currentUser.set(null); // importante anche per l'effetto reactive
        this.router.navigate(['/login']); // redirect se non loggato

      }
    });
  }


  aggiornaDenaro(nuovoImporto: number) {
    if (this.currentUser() !== null) {
      const utente = { ...this.currentUser()! };
      var soldi = 0
      if(nuovoImporto == 5){
        soldi = 200
      }
      else if(nuovoImporto == 20){
        soldi = 1000
      }
      else{
        soldi = 10000
      }
      utente.money = (this.currentUser()?.money ?? 0) + soldi;  
      this.currentUser.set(utente);
      console.log(this.currentUser()?.money);
      this.authService.saveUserData(this.currentUser()!);
    }
  }

  
  

}
