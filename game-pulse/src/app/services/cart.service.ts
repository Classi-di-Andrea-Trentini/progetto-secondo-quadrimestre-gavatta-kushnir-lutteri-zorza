import { Injectable } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(item: Omit<CartItem, 'quantity'>): number {
    const existing = this.cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    return this.cart.length;
  }

  removeFromCart(id: string): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  clearCart(): void {
    this.cart = [];
  }
}