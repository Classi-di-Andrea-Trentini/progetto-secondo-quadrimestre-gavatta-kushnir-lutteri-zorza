import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrezziComponent } from './prezzi/prezzi.component';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, PrezziComponent],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {
  showPrices: boolean = false;

  togglePrices() {
    this.showPrices = !this.showPrices;
  }

  onShopNow() {
    console.log('Shop Now clicked');
    // Implementa la logica per lo shopping
  }
}
