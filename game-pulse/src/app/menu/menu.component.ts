
import { IAIResponse } from '../interfaces/i-airesponse';
import { OpenaiService } from '../services/openai.service';
import { Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamePulseService } from '../game-pulse.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { SearchGames } from '../search-games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  {
  immagine = '/logo.png';
  menuOpen = false;

  sidebarOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
    iaResponse: WritableSignal<IAIResponse | null> = signal(null);
    viewSpinner: WritableSignal<boolean> = signal<boolean>(false);
    openaiService: OpenaiService = inject(OpenaiService);
    userInput: string = '';
  
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

    queryText: string = '';
   isLoading: boolean = false;
    aiResponse: WritableSignal<IAIResponse | null> = signal(null);

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



  gameListOpen = true;
  gameName: FormControl = new FormControl('');
  gameList: WritableSignal<SearchGames | null> = signal<SearchGames | null>(null);

  private gamePulseService: GamePulseService = inject(GamePulseService);
  /* Definire una proprietà di tipo Form control
    Mi consente di realizzare delle form che hanno robe piu avanzate rispetto a quelle di html
  */


  onSearchClick() {
    this.gameListOpen = true;
    setTimeout(() => {
      this.gameListOpen = false;
    }, 4000); // Chiude la lista dopo 4 secondi
  }


    ngOnInit(): void {
      this.gameName.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(nome => {
          if(nome.length > 0) {
            /* Nel input ce scirtto qualcosa quindi mando la richiesta */
            return this.gamePulseService.searchGames(nome);
          }
          else {
            return of(null);
          }
        })
      )
      .subscribe(dati =>{
        this.gameList.set(dati);
    })
    }
}

