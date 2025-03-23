import { Component, inject, signal, WritableSignal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';

@Component({
  selector: 'app-test-negozio-component-poteteanche-eliminarlo',
  imports: [],
  templateUrl: './test-negozio-component-poteteanche-eliminarlo.component.html',
  styleUrl: './test-negozio-component-poteteanche-eliminarlo.component.css'
})
export class TestNegozioComponentPoteteancheEliminarloComponent {
  id : string = '';
  prezzo: number = 23;
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);

  private storeService: StoreService = inject(StoreService);
  async getGameStoreInfo(){
    try{
      this.listadiVendita.set(await this.storeService.getStoreGame());
      console.log(this.listadiVendita())
    }
    catch(error){
      console.log(error)
    }
  }

  async addGameStore(){
    try{
      await this.storeService.loadStoreGame(this.id, this.prezzo);
      this.getGameStoreInfo();
    }
    catch(error){
      console.log(error)
    }
  }





}
