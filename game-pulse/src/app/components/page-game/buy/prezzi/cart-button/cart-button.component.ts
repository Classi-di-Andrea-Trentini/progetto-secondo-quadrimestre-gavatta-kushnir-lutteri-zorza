import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/component/page-game/buy/prezzi/services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {
  
  constructor(private cartService: CartService) {}
  
  addToCart() {
    // Qui puoi definire l'oggetto da aggiungere al carrello
    const item = { 
      id: Math.random().toString(36).substr(2, 9),
      name: 'Prodotto',
      price: 19.99
    };
    
    const itemCount = this.cartService.addToCart(item);
    alert(`Prodotto aggiunto al carrello! (${itemCount} articoli nel carrello)`);
  }
}