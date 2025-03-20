import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prezzi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prezzi.component.html',
  styleUrl: './prezzi.component.css'
})
export class PrezziComponent {
  stores = [
    { name: 'Steam', price: '€29.99' },
    { name: 'Epic Games', price: '€34.99' },
    { name: 'GOG', price: '€27.99' }
  ];
}

