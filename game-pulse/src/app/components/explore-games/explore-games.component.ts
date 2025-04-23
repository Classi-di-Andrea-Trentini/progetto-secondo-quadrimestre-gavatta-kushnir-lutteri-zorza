import { Component, HostListener } from '@angular/core';
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
  isLoadingMore = false;
  error: string | null = null;
  selectedGenre: string | null = null;
  currentPage = 1;
  hasMoreGames = true;
  
  constructor(private GamePulseService: GamePulseService, private itadService: ItadService) {}
  
  ngOnInit() {
    this.loadTopRatedGames();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isLoading || this.isLoadingMore || !this.hasMoreGames) return;
    
    // Verifica se l'utente è vicino al fondo della pagina
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Se l'utente ha scrollato fino a ~100px dal fondo, carica altri giochi
    if (windowHeight + scrollTop >= documentHeight - 100) {
      this.loadMoreGames();
    }
  }

  loadTopRatedGames() {
    this.isLoading = true;
    this.currentPage = 1;
    this.games = [];
    this.GamePulseService.getTopRatedGames(this.currentPage).subscribe({
      next: (response: any) => {
        this.processGamesData(response.results);
        this.hasMoreGames = response.next !== null;
      },
      error: (err) => {
        this.error = 'Failed to load games';
        this.isLoading = false;
      }
    });
  }

  loadGamesByGenre(genreId: string) {
    this.isLoading = true;
    this.currentPage = 1;
    this.games = [];
    this.selectedGenre = genreId;
    this.GamePulseService.getGamesByGenre(genreId, this.currentPage).subscribe({
      next: (response: any) => {
        this.processGamesData(response.results);
        this.hasMoreGames = response.next !== null;
      },
      error: (err) => {
        this.error = `Failed to load games for genre: ${genreId}`;
        this.isLoading = false;
      }
    });
  }

  loadMoreGames() {
    if (this.isLoadingMore || !this.hasMoreGames) return;
    
    this.isLoadingMore = true;
    this.currentPage++;
    
    const loadMethod = this.selectedGenre 
      ? this.GamePulseService.getGamesByGenre(this.selectedGenre, this.currentPage)
      : this.GamePulseService.getTopRatedGames(this.currentPage);
    
    loadMethod.subscribe({
      next: (response: any) => {
        if (response.results.length > 0) {
          const newGames = this.processGamesDataAndReturn(response.results);
          this.games = [...this.games, ...newGames];
          this.hasMoreGames = response.next !== null;
        } else {
          this.hasMoreGames = false;
        }
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.error = 'Failed to load more games';
        this.isLoadingMore = false;
      }
    });
  }

  onGenereSelezionato(genreId: string) {
    console.log(`Richiesta giochi per genere: ${genreId}`);
    this.loadGamesByGenre(genreId);
  }

  private processGamesData(gamesData: any[]) {
    this.games = this.processGamesDataAndReturn(gamesData);
    this.isLoading = false;
  }
  
  private processGamesDataAndReturn(gamesData: any[]): any[] {
    const processedGames = gamesData.map((game: any) => {
      return {
        ...game,
        title: game.name,
        rating: this.convertRatingToStars(game.rating),
        price: this.itadService.getGamePrices(game.name),
        genre: game.genres.map((genre: any) => genre.name).join(', '),
        image: game.background_image
      };
    });
    return processedGames;
  }

  private convertRatingToStars(rating: number): string {
    const rounded = Math.round(rating * 2) / 2; // Arrotonda a 0.5
    const fullStars = Math.floor(rounded);
    const halfStar = rounded % 1 !== 0;
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(rounded));
  }
}