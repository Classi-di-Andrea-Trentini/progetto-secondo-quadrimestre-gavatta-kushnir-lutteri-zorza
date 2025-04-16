import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { GamePulseService } from '../../services/game-pulse.service';
import { InfoGioco } from '../../classes/info-gioco';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { DescrizioneComponent } from './descrizione/descrizione.component';
import { BuyComponent } from './buy/buy.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { ValutazioniComponent } from './valutazioni/valutazioni.component';
import { PrezziComponent } from './buy/prezzi/prezzi.component';


@Component({
  selector: 'app-page-game',
  standalone: true,
  imports: [HashtagComponent, ValutazioniComponent, DescrizioneComponent, BuyComponent, PlayerComponent],
  templateUrl: './page-game.component.html',
  styleUrl: './page-game.component.css'
})
export class PageGameComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private GamePulseService: GamePulseService = inject(GamePulseService);
  infoGioco: WritableSignal<InfoGioco | null> = signal<InfoGioco | null>(null);
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      let id: string = parametriNellaURL['id'];
      this.GamePulseService.searchGameById(id).subscribe((dati) => {
        this.infoGioco.set(dati);
      });
    });
  }
}
