import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  getCartItems() {
    return this.cartItems.value;
  }

  addToCart(item: any) {
    const currentItems = this.cartItems.value;
    // Cerca se l'articolo esiste già (stesso id)
    const existingIndex = currentItems.findIndex(i => i.id === item.id);
    if (existingIndex !== -1) {
      // Se esiste, aggiorna la quantità
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantita: (updatedItems[existingIndex].quantita || 1) + (item.quantita || 1)
      };
      this.cartItems.next(updatedItems);
      return updatedItems.reduce((sum, i) => sum + (i.quantita || 1), 0);
    } else {
      // Se non esiste, aggiungi nuovo
      const updatedItems = [...currentItems, item];
      this.cartItems.next(updatedItems);
      return updatedItems.reduce((sum, i) => sum + (i.quantita || 1), 0);
    }
  }
}