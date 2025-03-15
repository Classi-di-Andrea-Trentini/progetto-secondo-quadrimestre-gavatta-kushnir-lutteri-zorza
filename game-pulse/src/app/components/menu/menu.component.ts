import { IAIResponse } from '../../interfaces/i-airesponse';
import { OpenaiService } from '../../services/openai.service';
import { Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamePulseService } from '../../services/game-pulse.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { SearchGames } from '../../classes/search-games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  immagine = '/logo.png';
  menuOpen : WritableSignal<boolean> = signal<boolean>(true);
  sidebarOpen: boolean = false;
  sidebarNonAi: boolean = false;

  // Game search properties
  gameListOpen = true;
  gameName: FormControl = new FormControl('');
  gameList: WritableSignal<SearchGames | null> = signal<SearchGames | null>(null);
  private gamePulseService: GamePulseService = inject(GamePulseService);

  // AI-related properties
  iaResponse: WritableSignal<IAIResponse | null> = signal(null);
  viewSpinner: WritableSignal<boolean> = signal<boolean>(false);
  openaiService: OpenaiService = inject(OpenaiService);
  userInput: string = '';
  
  queryText: string = '';
  isLoading: boolean = false;
  aiResponse: WritableSignal<IAIResponse | null> = signal(null);


  // UI methods
    onGameClick(){
      this.menuOpen.set(false);
    }
    onSearchClick() {
      this.menuOpen.set(true);
    }


  chiusuraMenu() {
    this.sidebarNonAi = !this.sidebarNonAi;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // AI methods
  testAI() {
    this.viewSpinner.set(true);
    this.openaiService.ask('Che cosa sei in grado di fare? Formatta la risposta in HTML.').subscribe(result => {
      this.iaResponse.set(result);
      this.viewSpinner.set(false);
    });
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }

  searchText() {
    const query = this.userInput;
    this.viewSpinner.set(true);
    this.openaiService.ask(query).subscribe(result => {
      this.iaResponse.set(result);
      this.viewSpinner.set(false);
    });
  }

  handleQueryChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.queryText = inputElement.value;
  }

  executeSearch() {
    const query = this.queryText;
    this.isLoading = true;
    this.queryText = '';
    this.aiResponse.set(null); // Resetta la risposta

    this.openaiService.ask(query).subscribe(result => {
      this.aiResponse.set(result);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.gameName.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(nome => {
        if(nome.length > 0) {
          /* Nel input ce scritto qualcosa quindi mando la richiesta */
          return this.gamePulseService.searchGames(nome);
        }
        else {
          return of(null);
        }
      })
    )
    .subscribe(dati => {
      this.gameList.set(dati);
    });
  }
}