import { Component, inject, WritableSignal } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-test-negozio-component-poteteanche-eliminarlo',
  imports: [],
  templateUrl: './test-negozio-component-poteteanche-eliminarlo.component.html',
  styleUrl: './test-negozio-component-poteteanche-eliminarlo.component.css'
})
export class TestNegozioComponentPoteteancheEliminarloComponent {
  id : string = '';
  prezzo: number = 23;

  private storeService: StoreService = inject(StoreService);
  async getGameStoreInfo(){
    try{
      console.log("hello");
      await console.log(this.storeService.getStoreGame());
    }
    catch(error){
      console.log(error)
    }
  }

}
