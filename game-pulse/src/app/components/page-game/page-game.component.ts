import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { GamePulseService } from '../../services/game-pulse.service';
import { InfoGioco } from '../../classes/info-gioco';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page-game',
  imports: [],
  templateUrl: './page-game.component.html',
  styleUrl: './page-game.component.css'
})
export class PageGameComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private GamePulseService: GamePulseService = inject(GamePulseService);
  infoGioco:  WritableSignal<InfoGioco | null> = signal<InfoGioco | null>(null);
  ngOnInit(): void {
        /* 
    snapshot è una proprietà di ActivatedRoute che restituisce un oggetto
    che contiene i parametri presenti nella URL
    Ma ha un problema se la URL cambia non viene aggiornato
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log(id);
    */
    /*  */
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      let id: string = parametriNellaURL['id'];
      this.GamePulseService.searchGameById(id).subscribe((dati) => {
        this.infoGioco.set(dati);

      })
    })

  }

}
