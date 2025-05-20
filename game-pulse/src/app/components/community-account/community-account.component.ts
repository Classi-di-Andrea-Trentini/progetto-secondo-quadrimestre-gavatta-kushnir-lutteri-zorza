import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { UserData } from '../../classes/user-data';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { GetUsersDataService } from '../../services/get-users-data.service';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';

@Component({
  selector: 'app-community-account',
  imports: [],
  templateUrl: './community-account.component.html',
  styleUrl: './community-account.component.css'
})
export class CommunityAccountComponent {
  user: WritableSignal<UserData | null> = signal<UserData | null>(null);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  getUserData: GetUsersDataService = inject(GetUsersDataService);
  constructor() { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      let id: string = parametriNellaURL['id'];
      console.log("id:", id);
      this.getUserData.searchUserByID(id).then((dati) => {
        this.user.set(dati as UserData);
        console.log(this.user())
        this.getStoreGameUser();
      });
    });
  }
  
  profileImages: string[] = [
    'profilouomo.png',  // Prima immagine
    'profilodonna.png'   // Seconda immagine
  ];
  // Indice dell'immagine attuale
  currentImageIndex: number = 0;
  // Immagine attualmente visualizzata
  profileImage: string = this.profileImages[this.currentImageIndex];

  authService: AuthService = inject(AuthService)
  storeService: StoreService = inject(StoreService)
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);


    compra(gioco: GiocoVenduto) {
      if ((this.authService.currentUser()?.money ?? 0) - gioco.prezzo < 0) {
        console.log("Non hai abbastanza soldi");
        return;
      }
      else {
        console.log("Sto comprando")
        this.storeService.buyGame(gioco);
      }
  
    }
  


      async getStoreGameUser() {
        const uid = this.user()?.uid?.toString() || "0";

        this.listadiVendita.set(await this.storeService.getStoreGameUser(uid));
        console.log(await this.storeService.getStoreGameUser(uid))

  }

    data(data: Data): string {
    return data['toDate']().toLocaleDateString()
  }

  
}
