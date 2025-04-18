import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateraleGeneriComponent } from './barra-laterale-generi/barra-laterale-generi.component';
import { GameCardComponent } from './game-card/game-card.component';

@Component({
  selector: 'app-explore-games',
  standalone: true,
  imports: [CommonModule, BarraLateraleGeneriComponent, GameCardComponent],
  templateUrl: './explore-games.component.html',
  styleUrl: './explore-games.component.css'
})
export class ExploreGamesComponent {
  games = Array(15).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Titolo del Gioco ${i + 1}`,
    genre: 'Azione, Avventura',
    rating: '★★★★☆',
    price: '€59.99'
  }));
}
