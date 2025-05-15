import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../../services/cart.service';

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
    const item = { 
      id: 'prodotto-1', // Sostituisci con l'id reale del prodotto
      name: 'Prodotto', // Sostituisci con il nome reale
      price: 19.99      // Sostituisci con il prezzo reale
    };
    this.cartService.addToCart(item);
    alert('Prodotto aggiunto al carrello!');
  }
}