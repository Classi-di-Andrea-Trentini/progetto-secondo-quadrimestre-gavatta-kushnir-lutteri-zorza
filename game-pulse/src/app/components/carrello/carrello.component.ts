import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent {
  constructor(public cartService: CartService) {}

  get carrello(): CartItem[] {
    return this.cartService.getCart();
  }

  get totale(): number {
    return this.carrello.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  rimuoviDalCarrello(id: string): void {
    this.cartService.removeFromCart(id);
  }
}
