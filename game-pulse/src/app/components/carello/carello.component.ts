import { Component, effect, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../page-game/buy/prezzi/services/cart.service';

@Component({
  selector: 'app-carello',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './carello.component.html',
  styleUrl: './carello.component.css'
})
export class CarelloComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);
  private router = inject(Router);
  cartService = inject(CartService);
  cartItems: any[] = [];

  constructor(private http: HttpClient) {
    // Effetto solo per utente
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.currentUser.set(user);
      } else {
        this.currentUser.set(null);
      }
    });
  }

  ngOnInit() {
    // Sottoscrizione al carrello (sempre aggiornata)
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
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