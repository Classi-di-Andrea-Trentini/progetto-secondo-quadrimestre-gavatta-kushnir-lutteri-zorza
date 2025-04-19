import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateraleGeneriComponent } from './barra-laterale-generi/barra-laterale-generi.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GamePulseService } from '../../services/game-pulse.service';
import { ItadService } from '../../services/itad.service';


@Component({
  selector: 'app-explore-games',
  standalone: true,
  imports: [CommonModule, BarraLateraleGeneriComponent, GameCardComponent],
  templateUrl: './explore-games.component.html',
  styleUrl: './explore-games.component.css'
})
export class ExploreGamesComponent {
  games: any[] = [];
  isLoading = true;
  error: string | null = null;

  
  constructor(private GamePulseService: GamePulseService, private itadService: ItadService) {}
  
  ngOnInit() {
    this.GamePulseService.getTopRatedGames().subscribe({
      next: (response: any) => {
        this.games = response.results;
        this.isLoading = false;
        this.games.forEach((game: any) => {
          game.title = game.name; // Mappatura corretta del titolo
          game.rating = this.convertRatingToStars(game.rating); // Conversione rating
          game.price = this.itadService.getGamePrices(game.title); // Placeholder se non presente
          game.genre = game.genres.map((genre: any) => genre.name).join(', ');
          game.image = game.background_image; // URL dell'immagine
        });
      },
      error: (err) => {
        this.error = 'Failed to load games';
        this.isLoading = false;
      }
    });
  }

  private convertRatingToStars(rating: number): string {
    const rounded = Math.round(rating * 2) / 2; // Arrotonda a 0.5
    const fullStars = Math.floor(rounded);
    const halfStar = rounded % 1 !== 0;
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(rounded));
  }
}