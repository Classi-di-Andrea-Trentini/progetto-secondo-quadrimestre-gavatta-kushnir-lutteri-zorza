import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateraleGeneriComponent } from './barra-laterale-generi/barra-laterale-generi.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GamePulseService } from '../../services/game-pulse.service';
import { ItadService } from '../../services/itad.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EventServiceService } from '../../services/event-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore-games',
  standalone: true,
  imports: [CommonModule, BarraLateraleGeneriComponent, GameCardComponent,RouterLink, RouterLinkActive],
  templateUrl: './explore-games.component.html',
  styleUrl: './explore-games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreGamesComponent implements OnInit, OnDestroy {
  games: any[] = [];
  visibleGames: any[] = []; // Solo i giochi attualmente visibili
  isLoading = true;
  isLoadingMore = false;
  error: string | null = null;
  selectedGenre: string | null = null;
  currentPage = 1;
  hasMoreGames = true;
  
  // Nuove proprietà per ottimizzazione
  private readonly PAGE_SIZE = 20; // Numero di giochi da caricare per volta
  private scrollThrottleTimeout: any = null;
  // Costante per il genere azione
  private readonly ACTION_GENRE_ID = '4';
  
  constructor(
    private GamePulseService: GamePulseService, 
    private itadService: ItadService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private eventService: EventServiceService
  ) {}
  
  // Sottoscrizione agli eventi del service
  private subscription: Subscription | null = null;
  
  ngOnInit() {
    // Carica i giochi di azione immediatamente all'avvio dell'applicazione
    this.loadGamesByGenre(this.ACTION_GENRE_ID);
    
    // Sottoscrizione agli eventi del service per reagire ai cambiamenti di genere
    // quando una card viene cliccata nella seconda-page
    this.subscription = this.eventService.genere$.subscribe(genere => {
      const mappaGeneri: {[key: string]: string} = {
        'Azione': 'action',
        'Avventura': 'adventure',
        'RPG': 'role-playing-games-rpg',
        'Strategia': 'strategy',
        'Simulazione': 'simulation',
        'Sport': 'sports',
        'Corsa': 'racing',
        'Puzzle': 'puzzle',
        'Platform': 'platformer',
        'FPS': 'shooter',
        'Survival Horror': 'survival',
        'MMORPG': 'massively-multiplayer',
        'Picchiaduro': 'fighting',
        'Gestionale': 'board-games',
        'Open World': 'open-world',
        'Stealth': 'stealth',
        'Rogue-like': 'indie',
        'Tower Defense': 'tower-defense',
        'Visual Novel': 'card'
      };
      
      const genreId = mappaGeneri[genere];
      if (genreId) {
        this.loadGamesByGenre(genreId);
      }
    });
  }
  
  ngOnDestroy() {
    // Pulizia della sottoscrizione quando il componente viene distrutto
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Implementazione del throttling per evitare troppe chiamate durante lo scroll
    if (this.scrollThrottleTimeout) return;
    
    this.ngZone.runOutsideAngular(() => {
      this.scrollThrottleTimeout = setTimeout(() => {
        if (this.isLoading || this.isLoadingMore || !this.hasMoreGames) {
          this.scrollThrottleTimeout = null;
          return;
        }
        
        // Verifica se l'utente è vicino al fondo della pagina
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Se l'utente ha scrollato fino a ~300px dal fondo, carica altri giochi
        if (windowHeight + scrollTop >= documentHeight - 300) {
          this.ngZone.run(() => {
            this.loadMoreGames();
            this.cdr.markForCheck();
          });
        }
        
        this.scrollThrottleTimeout = null;
      }, 200); // 200ms di throttle
    });
  }

  loadTopRatedGames() {
    this.isLoading = true;
    this.currentPage = 1;
    this.games = [];
    this.visibleGames = [];
    this.selectedGenre = null; // Resetta il genere selezionato quando si visualizzano i top rated
    this.GamePulseService.getTopRatedGames(this.currentPage, this.PAGE_SIZE).subscribe({
      next: (response: any) => {
        this.processGamesData(response.results);
        this.hasMoreGames = response.next !== null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load games';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadGamesByGenre(genreId: string) {
    this.isLoading = true;
    this.currentPage = 1;
    this.games = [];
    this.visibleGames = [];
    this.selectedGenre = genreId;
    this.GamePulseService.getGamesByGenre(genreId, this.currentPage, this.PAGE_SIZE).subscribe({
      next: (response: any) => {
        this.processGamesData(response.results);
        this.hasMoreGames = response.next !== null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = `Failed to load games for genre: ${genreId}`;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadMoreGames() {
    if (this.isLoadingMore || !this.hasMoreGames) return;
    
    this.isLoadingMore = true;
    this.currentPage++;
    
    const loadMethod = this.selectedGenre 
      ? this.GamePulseService.getGamesByGenre(this.selectedGenre, this.currentPage, this.PAGE_SIZE)
      : this.GamePulseService.getTopRatedGames(this.currentPage, this.PAGE_SIZE);
    
    loadMethod.subscribe({
      next: (response: any) => {
        if (response.results.length > 0) {
          const newGames = this.processGamesDataAndReturn(response.results);
          this.games = [...this.games, ...newGames];
          this.updateVisibleGames();
          this.hasMoreGames = response.next !== null;
        } else {
          this.hasMoreGames = false;
        }
        this.isLoadingMore = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load more games';
        this.isLoadingMore = false;
        this.cdr.markForCheck();
      }
    });
  }

  onGenereSelezionato(genreId: string) {
    console.log(`Richiesta giochi per genere: ${genreId}`);
    this.loadGamesByGenre(genreId);
  }

  // Funzione per monitorare le modifiche alla lista con trackBy
  trackByGameId(index: number, game: any): number {
    return game.id || index;
  }

  private processGamesData(gamesData: any[]) {
    this.games = this.processGamesDataAndReturn(gamesData);
    this.updateVisibleGames();
    this.isLoading = false;
  }
  
  private processGamesDataAndReturn(gamesData: any[]): any[] {
    // Processa in modo più efficiente usando map solo per i dati necessari
    return gamesData.map((game: any) => ({
      id: game.id,
      title: game.name,
      rating: this.convertRatingToStars(game.rating),
      price: null, // Carica i prezzi in maniera lazy quando richiesto
      genre: this.extractGenres(game.genres),
      image: game.background_image
    }));
  }

  // Estrai i generi in modo più efficiente
  private extractGenres(genres: any[]): string {
    if (!genres || genres.length === 0) return '';
    return genres.map(genre => genre.name).join(', ');
  }

  // Aggiorna solo i giochi visibili
  private updateVisibleGames() {
    this.visibleGames = this.games.slice(0, Math.min(this.games.length, this.currentPage * this.PAGE_SIZE));
  }

  // Carica i prezzi solo quando necessario per i giochi visibili
  loadPriceForGame(game: any): void {
    if (game && !game.price) {
      this.itadService.getGamePrices(game.title).subscribe(price => {
        game.price = price;
        this.cdr.markForCheck();
      });
    }
  }

  private convertRatingToStars(rating: number): string {
    if (!rating) return '☆☆☆☆☆';
    const rounded = Math.round(rating * 2) / 2; // Arrotonda a 0.5
    const fullStars = Math.floor(rounded);
    const halfStar = rounded % 1 !== 0;
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(rounded));
  }
}