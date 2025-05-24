import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button/cart-button.component';

@Component({
  selector: 'app-prezzi',
  standalone: true,
  imports: [CommonModule, CartButtonComponent], 
  templateUrl: './prezzi.component.html',
  styleUrls: ['./prezzi.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezziComponent {
  stores = [
    { name: 'Steam', price: '€59.99', storeUrl: 'https://store.steampowered.com/' },
    { name: 'Epic Games', price: '€54.99', storeUrl: 'https://www.epicgames.com/site/it/home' },
    { name: 'GoG', price: '€49.99', storeUrl: 'https://www.gog.com/en/' }
  ];

  selectedGame: any = null; // Nessun gioco selezionato di default

  // Se vuoi cambiare il gioco selezionato quando l'utente clicca su uno store:
  selectGame(store: any) {
    if (this.selectedGame === store) {
      this.selectedGame = null; // Deseleziona se già selezionato
    } else {
      this.selectedGame = store;
    }
  }
}
