import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definisci l'interfaccia prima di usarla
interface Store {
  name: string;
  price: string;
  storeUrl: string;
}

@Component({
  selector: 'app-prezzi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prezzi.component.html',
  styleUrls: ['./prezzi.component.css'] // Cambia da styleUrl a styleUrls (array)
})
export class PrezziComponent implements OnInit {
  stores: Store[] = [];

  ngOnInit(): void {
    // Inizializza i dati con gli URL degli store
    this.stores = [
      {
        name: 'Steam',
        price: '€21.99',
        storeUrl: 'https://store.steampowered.com/app'
      },
      {
        name: 'Epic Games',
        price: '€19.99',
        storeUrl: 'https://www.epicgames.com/store/it/'
      },
      {
        name: 'GOG',
        price: '€22.99',
        storeUrl: 'https://www.gog.com/'
      }
    ];
  }
}

