import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common'; // <-- Importa CurrencyPipe e NgIf
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-utente',
  standalone: true,
  imports: [CurrencyPipe, NgIf], // <-- Aggiungi qui CurrencyPipe e NgIf
  templateUrl: './account-utente.component.html',
  styleUrl: './account-utente.component.css'
})
export class AccountUtenteComponent{
  private authService: AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);

  storeService: StoreService = inject(StoreService)
  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);


  private apiUrl = 'http://127.0.0.1:4200'; // Assicurati che l'IP e la porta siano corretti
  fileNameToDownload: string = 'il_tuo_file.txt'; // Sostituisci con il nome del file che vuoi scaricare
  downloadMessage: string = '';
ngOnInit(): void {
  this.getStoreGameUser()
  }

  constructor(private http: HttpClient) { 
    effect(() => {
      const user = this.authService.currentUser();  // questo dovrebbe restituire i dati anche dopo un nuovo login
      this.getStoreGameUser()
      if (user) {
        console.log('Utente loggato:', user);
        this.currentUser.set(user);
      } else {
        console.log('Utente non loggato');
        this.currentUser.set(null); // importante anche per l'effetto reactive
      }
    });
  }
  
  

  logout(): void {
    this.authService.logout();
    this.currentUser.set(null);
  }
  

    async getStoreGameUser() {
        console.log(this.currentUser())
        const uid = this.currentUser()?.uid || "0";
        this.listadiVendita.set(await this.storeService.getMyGames(uid));
        console.log(await this.storeService.getMyGames(uid))

  }

    data(data: Data): string {
    return data['toDate']().toLocaleDateString()
  }
  

  
    download(gioco: GiocoVenduto) {
      if ((this.authService.currentUser()?.money ?? 0) - gioco.prezzo < 0) {
        console.log("Non hai abbastanza soldi");
        return;
      }
      else {
        console.log("Sto comprando")
        this.storeService.buyGame(gioco);
      }
  
    }

  // Metodo per avviare il download del file
  onDownloadClick(gioco: GiocoVenduto): void {
    // Puoi aggiungere una validazione se fileName è vuoto o nullo
    const fileName: string = gioco.idDoc;

    this.downloadMessage = `Inizio download di '${fileName}'...`;
    const url = `${this.apiUrl}/download/${fileName}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        this.triggerDownload(blob, fileName); // Passa fileName anche qui
        this.downloadMessage = `File '${fileName}' scaricato con successo!`;
      },
      error: (err) => {
        console.error(`Errore durante il download di '${fileName}':`, err);
        this.downloadMessage = `Errore durante il download del file '${fileName}': ${err.message || 'Errore sconosciuto'}`;
      }
    });
  }

  // Funzione helper per avviare il download nel browser
  private triggerDownload(blob: Blob, filename: string): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl); // Libera la memoria allocata per l'URL temporaneo
  }


  }
