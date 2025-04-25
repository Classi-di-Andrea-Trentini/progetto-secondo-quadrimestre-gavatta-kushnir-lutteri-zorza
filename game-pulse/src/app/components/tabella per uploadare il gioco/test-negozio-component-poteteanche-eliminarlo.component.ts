import { AfterViewInit, Component, inject, Input, input, OnInit, signal, WritableSignal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-test-negozio-component-poteteanche-eliminarlo',
  imports: [],
  templateUrl: './test-negozio-component-poteteanche-eliminarlo.component.html',
  styleUrl: './test-negozio-component-poteteanche-eliminarlo.component.css'
})
export class TestNegozioComponentPoteteancheEliminarloComponent implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @Input() id : number | undefined = undefined;
  uid : string = "uid del gioco";
  prezzo: number = 23;
  
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);
  authService: AuthService = inject(AuthService);
  private storeService: StoreService = inject(StoreService);
  async getGameStoreInfo(){
    this.uid = this.id?.toString() || "0";
    
    this.listadiVendita.set(await this.storeService.getStoreGame(this.uid.toString()));
    console.log(this.listadiVendita())
    
  }

  async upload(){
    this.uid = this.id?.toString() || "0";
    console.log("caricamento in corso ", this.uid.toString(), this.prezzo);
    await this.storeService.addGameStore(this.uid.toString(), this.prezzo);
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
      this.storeService.buyGame(gioco);
    }

  }

  





}
