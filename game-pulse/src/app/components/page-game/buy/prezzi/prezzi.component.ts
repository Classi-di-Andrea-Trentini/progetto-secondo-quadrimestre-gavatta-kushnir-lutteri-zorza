import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prezzi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prezzi.component.html',
  styleUrl: './prezzi.component.css'
})
export class PrezziComponent implements OnInit {
  stores: Store[] = [
    { name: 'Steam', price: '€29.99', storeUrl: '' },
    { name: 'Epic Games', price: '€34.99', storeUrl: '' },
    { name: 'GOG', price: '€27.99', storeUrl: '' }
  ];

  ngOnInit(): void {
    // Inizializza i dati con gli URL degli store
    this.stores = [
      {
        name: 'Steam',
        price: '€59.99',
        storeUrl: 'https://store.steampowered.com/app'
      },
      {
        name: 'Epic Games',
        price: '€54.99',
        storeUrl: 'https://www.epicgames.com/store/it/'
      },
      {
        name: 'GOG',
        price: '€49.99',
        storeUrl: 'https://www.gog.com/'
      }
      // Mantieni gli altri store che hai già definito
    ];
  }
}

interface Store {
  name: string;
  price: string;
  storeUrl: string; // Aggiunta questa proprietà
}

