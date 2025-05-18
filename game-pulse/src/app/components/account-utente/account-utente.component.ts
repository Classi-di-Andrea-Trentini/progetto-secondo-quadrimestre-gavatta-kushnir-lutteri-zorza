import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common'; // <-- Importa CurrencyPipe e NgIf
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { Data } from '@angular/router';

@Component({
  selector: 'app-account-utente',
  standalone: true,
  imports: [CurrencyPipe, NgIf], // <-- Aggiungi qui CurrencyPipe e NgIf
  templateUrl: './account-utente.component.html',
  styleUrl: './account-utente.component.css'
})
export class AccountUtenteComponent{
  private authService: AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);

  storeService: StoreService = inject(StoreService)
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);

ngOnInit(): void {
  this.getStoreGameUser()
  }

  constructor() { 
    effect(() => {
      const user = this.authService.currentUser();  // questo dovrebbe restituire i dati anche dopo un nuovo login
      this.getStoreGameUser()
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
  

    async getStoreGameUser() {
        console.log(this.currentUser())
        const uid = this.currentUser()?.uid || "0";
        this.listadiVendita.set(await this.storeService.getMyGames(uid));
        console.log(await this.storeService.getMyGames(uid))

  }

    data(data: Data): string {
    return data['toDate']().toLocaleDateString()
  }
  

  
    download(gioco: GiocoVenduto) {
      if ((this.authService.currentUser()?.money ?? 0) - gioco.prezzo < 0) {
        console.log("Non hai abbastanza soldi");
        return;
      }
      else {
        console.log("Sto comprando")
        this.storeService.buyGame(gioco);
      }
  
    }
}
