import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button/cart-button.component';

@Component({
  selector: 'app-prezzi',
  standalone: true,
  imports: [CommonModule, CartButtonComponent], 
  templateUrl: './prezzi.component.html',
  styleUrls: ['./prezzi.component.css']
})
export class PrezziComponent {
  stores = [
    { name: 'Steam', price: '€59.99', storeUrl: 'https://store.steampowered.com/' },
    { name: 'Epic Games', price: '€54.99', storeUrl: 'https://www.epicgames.com/site/it/home' },
    { name: 'GoG', price: '€49.99', storeUrl: 'https://www.gog.com/en/' }

  ];
}
