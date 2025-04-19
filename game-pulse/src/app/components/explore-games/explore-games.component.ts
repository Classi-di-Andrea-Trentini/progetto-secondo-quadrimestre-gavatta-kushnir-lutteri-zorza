import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateraleGeneriComponent } from './barra-laterale-generi/barra-laterale-generi.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GamePulseService } from '../../services/game-pulse.service';

@Component({
  selector: 'app-explore-games',
  standalone: true,
  imports: [CommonModule, BarraLateraleGeneriComponent, GameCardComponent],
  templateUrl: './explore-games.component.html',
  styleUrl: './explore-games.component.css'
})
export class ExploreGamesComponent{
/*   games = Array(15).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Titolo del Gioco ${i + 1}`,
    genre: 'Azione, Avventura',
    rating: '★★★★☆',
    price: '€59.99'
  })); */

  games: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private GamePulseService: GamePulseService) {}

  ngOnInit() {
    this.GamePulseService.getTopRatedGames().subscribe({
      next: (response: any) => {
        this.games = response.results;
        this.isLoading = false;
        this.games.forEach((game: any) => {
          game.rating = '★★★★★'; // Placeholder for rating
          game.price = '€59.99'; // Placeholder for price
          game.genre = game.genres.map((genre: any) => genre.name).join(', '); // Join genres into a string
        });
      },
      error: (err) => {
        this.error = 'Failed to load games';
        this.isLoading = false;
      }
    });
    
  }
}
