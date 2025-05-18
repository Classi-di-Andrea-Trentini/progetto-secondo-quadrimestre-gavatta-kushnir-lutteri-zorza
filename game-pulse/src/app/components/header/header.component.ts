import { IAIResponse } from '../../interfaces/i-airesponse';
import { OpenaiService } from '../../services/openai.service';
import { Component, effect, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamePulseService } from '../../services/game-pulse.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { SearchGames } from '../../classes/search-games';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // Game search properties
  gamePulseService: GamePulseService = inject(GamePulseService);
  authService:AuthService = inject(AuthService);
  openaiService: OpenaiService = inject(OpenaiService);


  menuOpen : WritableSignal<boolean> = signal<boolean>(true);
  gameList: WritableSignal<SearchGames | null> = signal<SearchGames | null>(null);
  // AI-related properties
  aiResponse: WritableSignal<IAIResponse | null> = signal(null);
  viewSpinner: WritableSignal<boolean> = signal<boolean>(false);
  gameName: FormControl = new FormControl('');
  
  gameListOpen = true;
  sidebarOpen: boolean = false;
  sidebarNonAi: boolean = false;
  isLoading: boolean = false;
  queryText: string = '';
  


  logout() {
    console.log("Logout");
    this.authService.logout()
  }
  // UI methods
  onGameClick(){
    this.menuOpen.set(false);
  }
  
  onSearchClick() {
    this.menuOpen.set(true);
  }

  toggleMobileMenu() {
    this.sidebarNonAi = !this.sidebarNonAi;
  }

  toggleAiSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // AI methods
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
