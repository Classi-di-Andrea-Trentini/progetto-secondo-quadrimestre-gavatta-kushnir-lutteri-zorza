import { Component, EventEmitter, inject, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { Data, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { EventServiceService } from '../../services/event-service.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  storeService: StoreService = inject(StoreService);
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);
  imgGioco: WritableSignal<string[]> = signal<string[]>(["cs16.jpg", "cs16.jpg", "cs16.jpg", "cs16.jpg"]);
  router: Router = inject(Router);
  ngOnInit(): void {
    this.getGameStoreInfo() ;
  }
  async getGameStoreInfo(){
    const games = await this.storeService.getStoreGames();
    console.log(games);

    if (games) {
      // Ordina i giochi in base alla data (più recente prima)
      const sortedGames = games.sort((a, b) => {
        const dateA = this.data2(a.data);
        const dateB = this.data2(b.data);
        return dateB - dateA; // Ordine decrescente
      });
      this.listadiVendita.set(sortedGames);
      console.log("home:",this.listadiVendita)
      this.imgGioco.set([sortedGames[0]?.gameImg ?? "cs16.jpg", sortedGames[1]?.gameImg ?? "cs16.jpg", sortedGames[2]?.gameImg ?? "cs16.jpg", sortedGames[3]?.gameImg ?? "cs16.jpg"]);
    
    }
  }
    data(data: Data): string {
      return data['toDate']().toLocaleDateString()
    }

    data2(data: Data): number {
      return data['toDate']().getTime()
    }





    

    


    eventService: EventServiceService = inject(EventServiceService);
    
    goToCategory(genere: string): void {

      this.eventService.setGenere(genere); // Emette l'ID inglese del genere selezionato
        // Emette l'ID inglese del genere selezionato
    
      }
}
