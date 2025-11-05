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
    const updatedItems = [...currentItems, item];
    this.cartItems.next(updatedItems);
    return updatedItems.length; // Ritorna il nuovo conteggio
  }
}