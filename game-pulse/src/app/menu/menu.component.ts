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
