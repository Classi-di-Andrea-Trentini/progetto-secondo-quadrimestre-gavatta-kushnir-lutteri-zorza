import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {
  @Input() game: any; // Accetta i dati del gioco come input
  @Input() quantita: number = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    // Usa i dati reali del gioco se forniti, altrimenti fallback
    const item = this.game ? {
      id: this.game.id,
      name: this.game.name || this.game.nome,
      quantita: this.quantita,
      prezzo: this.game.price || this.game.prezzo,
    } : {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Prodotto',
      quantita: this.quantita,
      prezzo: 19.99
    };
    
    const itemCount = this.cartService.addToCart(item);
    alert(`Prodotto aggiunto al carrello! (${itemCount} articoli nel carrello)`);
  }
}