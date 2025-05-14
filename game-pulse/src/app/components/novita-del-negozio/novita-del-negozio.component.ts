import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { StoreService } from '../../services/store.service';
import { Data, RouterLink, RouterLinkActive } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-novita-del-negozio',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './novita-del-negozio.component.html',
  styleUrl: './novita-del-negozio.component.css'
})
export class NovitaDelNegozioComponent implements OnInit {
  storeService: StoreService = inject(StoreService);
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);
  firestore: Firestore = inject(Firestore);
  ngOnInit(): void {
    this.getGameStoreInfo();
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
    }
  }
    data(data: Data): string {
      return data['toDate']().toLocaleDateString()
    }

    data2(data: Data): number {
      console.log(data['toDate']().getTime())
      return data['toDate']().getTime()
    }
}
