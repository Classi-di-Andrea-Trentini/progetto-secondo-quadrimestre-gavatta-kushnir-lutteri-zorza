import { AfterViewInit, Component, inject, Input, input, OnInit, signal, WritableSignal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { timestamp } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
 

@Component({
  selector: 'app-test-negozio-component-poteteanche-eliminarlo',
  imports: [FormsModule],
  templateUrl: './test-negozio-component-poteteanche-eliminarlo.component.html',
  styleUrl: './test-negozio-component-poteteanche-eliminarlo.component.css'
})
export class TestNegozioComponentPoteteancheEliminarloComponent implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @Input() id : number | undefined = undefined;
  uid : string = "uid del gioco";
  
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);
  authService: AuthService = inject(AuthService);
  isPopupVisible: boolean = false;
  gameDescription: string = '';
  gamePrice: number = 0;
  private storeService: StoreService = inject(StoreService);
  async getGameStoreInfo(){
    this.uid = this.id?.toString() || "0";
    
    this.listadiVendita.set(await this.storeService.getStoreGame(this.uid.toString()));
    console.log(this.listadiVendita())
    
  }

  async upload(){
    this.uid = this.id?.toString() || "0";
    console.log("caricamento in corso ", this.uid.toString(), this.gamePrice);
    await this.storeService.addGameStore(this.uid.toString(), this.gamePrice, this.gameDescription);
    this.getGameStoreInfo();
    
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      this.id = parametriNellaURL['id'];
      this.getGameStoreInfo()
      });
  };
  
  async deleteGame(){
    this.uid = this.id?.toString() || "0";
    try{
      await this.storeService.deleteGameStore(this.uid.toString(), "uid dell'offerta");
    }
    catch(error){
      console.log("caricamento fallito")
    }
  }

  compra(gioco: GiocoVenduto) {
    if((this.authService.currentUser()?.money ?? 0)-gioco.prezzo < 0){
      console.log("Non hai abbastanza soldi");
      return;
    }
    else{
      console.log("Sto comprando")
      this.storeService.buyGame(gioco);
    }

  }


  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  accept(): void {
    console.log('Descrizione accettata:', this.gameDescription);
    this.upload();
    // Qui puoi aggiungere la logica per salvare la descrizione
    this.isPopupVisible = false;
    this.gameDescription = '';
  }

  cancel(): void {
    console.log('Popup cancellato');
    this.isPopupVisible = false;
    this.gameDescription = '';
  }

  data(data:Data): string{
    return data['toDate']().toLocaleDateString()
  }
}