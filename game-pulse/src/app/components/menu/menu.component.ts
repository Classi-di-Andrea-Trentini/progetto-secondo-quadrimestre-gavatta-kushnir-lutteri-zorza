import { Component, inject, signal, WritableSignal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamePulseService } from '../../game-pulse.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { SearchGames } from '../../search-games';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  immagine = '/logo.png';
  menuOpen = false;




  private gamePulseService: GamePulseService = inject(GamePulseService);
  /* Definire una proprietà di tipo Form control
    Mi consente di realizzare delle form che hanno robe piu avanzate rispetto a quelle di html
  */
  gameName: FormControl = new FormControl('');
  gameList: WritableSignal<SearchGames | null> = signal<SearchGames | null>(null);
  ngOnInit(): void {
    /* Value Changes restituisce un Observable,
    la funzione passata con subscribe viene 
    eseguita ogni volta che viene modificato 
    il valore della input */

    /* .pipe consente di intercettare la modifica della input e applicare una serie
    di elaborazione passate fra parentesi tonde e separate da ,
    queste eleaborazione veranno eseguite prima che la funzione specificata da subscribe
    venga eseguita */
    this.gameName.valueChanges.pipe(
      /* debouncTime consente di specificare un TimeOut in milisecondi */
      /* 
        input viene ignorata
        a subsciribe arriveranno soltanto le modifiche che presentano una pausa di 300 ms
      */
      debounceTime(300),
      /* La distinctUntilChanged ignora le modifiche del valore della input se il valore 
      rispetto alla elaborazione precendente non è cambiato */
      distinctUntilChanged(),
      /* Consente di esguire la funzione di callback solo per l'ultimo evento generato dall'observable
      Ovviamento se non erano gia state commente (Spotify ci aveva gia mandato la risposta)
      SwitchMap esegue la funzione di callback solo per l'ultimo evento generato dall'observable
      */
      /* Attenzione il codice deve restituire in ogni caso un observable */
      switchMap(nome => {
        if(nome.length > 0) {
          /* Nel input ce scirtto qualcosa quindi mando la richiesta */
          return this.gamePulseService.searchGame(nome);
        }
        else {
          /* Nel input non c'è scritto nulla quindi non mando la richiesta */
          /* Dobbiamo restituire un Observable che restituisca un valore o  ISerach oppure null*/
          return of(null);
        }
      })
    )
    .subscribe(dati =>{
      this.gameList.set(dati);
  })
  }
}
