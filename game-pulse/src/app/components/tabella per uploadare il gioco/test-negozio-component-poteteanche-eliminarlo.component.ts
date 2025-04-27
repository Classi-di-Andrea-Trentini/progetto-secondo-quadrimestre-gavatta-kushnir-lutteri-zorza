import { AfterViewInit, Component, inject, Input, input, OnInit, signal, WritableSignal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { GiocoVenduto } from '../../classes/gioco-venduto';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { timestamp } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-test-negozio-component-poteteanche-eliminarlo',
  imports: [FormsModule],
  templateUrl: './test-negozio-component-poteteanche-eliminarlo.component.html',
  styleUrl: './test-negozio-component-poteteanche-eliminarlo.component.css'
})
export class TestNegozioComponentPoteteancheEliminarloComponent implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @Input() id: number | undefined = undefined;
  @Input() img: string | undefined = "cs16.jpg";
  @Input() title: string | undefined = "cs16.jpg";

  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';
  isUploading: boolean = false;
  chunkSize: number = 2 * 1024 * 1024; // 2MB (deve corrispondere al backend)
  uploadId: string | null = null;
  downloadUrl = 'http://192.168.1.104:4200/download/';
  fileList: string[] = ['large_document.pdf', 'large_image.jpg', 'The Dark Queen of Mortholme.zip']; // Sostituisci con la tua lista dinamica
  private http = inject(HttpClient); // Usa inject per ottenere HttpClient
  uid: string = "uid del gioco";

  listadiVendita: WritableSignal<GiocoVenduto[] | null> = signal<GiocoVenduto[] | null>(null);
  authService: AuthService = inject(AuthService);
  isPopupVisible: boolean = false;
  gameDescription: string = '';
  gamePrice: number = 0;
  private storeService: StoreService = inject(StoreService);
  async getGameStoreInfo() {
    this.uid = this.id?.toString() || "0";

    this.listadiVendita.set(await this.storeService.getStoreGame(this.uid.toString()));
    console.log(this.listadiVendita())

  }

  async upload() {
    this.uid = this.id?.toString() || "0";
    this.uploadLargeFile(this.uploadId ?? "0");
    console.log("caricamento in corso ", this.uid.toString(), this.gamePrice);
    await this.storeService.addGameStore(this.uid.toString(), this.gamePrice, this.gameDescription, this.uploadId ?? "0", this.img?? "cs16.jpg", this.title ?? "Nessun titolo");
    this.getGameStoreInfo();

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      this.id = parametriNellaURL['id'];
      this.getGameStoreInfo()
    });
  };

  async deleteGame() {
    this.uid = this.id?.toString() || "0";
    try {
      await this.storeService.deleteGameStore(this.uid.toString(), "uid dell'offerta");
    }
    catch (error) {
      console.log("caricamento fallito")
    }
  }

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


  togglePopup(): void {
    this.uploadId = uuidv4(); // Genera un ID per l'upload

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

  data(data: Data): string {
    return data['toDate']().toLocaleDateString()
  }


  /* Rova per uploadre il file sul mio portatile */
  onFileSelected(event: any): void {
    const originalFile = event.target.files[0];
    this.selectedFile = new File([originalFile], `${this.uploadId}.zip`, { type: originalFile.type, lastModified: originalFile.lastModified });
    this.uploadProgress = 0;
    this.uploadMessage = '';
    this.uploadId = null;
  }

  async uploadLargeFile(idUpload: string): Promise<void> {
    if (!this.selectedFile || this.isUploading) {
      return;
    }
    this.isUploading = true;
    const totalChunks = Math.ceil(this.selectedFile.size / this.chunkSize);
    let currentChunk = 1;

    while (currentChunk <= totalChunks) {
      const start = (currentChunk - 1) * this.chunkSize;
      const end = Math.min(currentChunk * this.chunkSize, this.selectedFile.size);
      const chunk = this.selectedFile.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk, this.selectedFile.name);
      formData.append('chunkNumber', currentChunk.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('filename', this.selectedFile.name);
      formData.append('uploadId', idUpload);

      try {
        const response = await this.http.post<{ message: string; error?: string; uploadId?: string }>(
          'http://192.168.1.104:4200/upload_chunk', // Usa l'IP corretto qui
          formData,
          { reportProgress: false, observe: 'body' }
        ).toPromise();

        if (response) {
          this.uploadProgress = Math.round((currentChunk / totalChunks) * 100);
          if (response.error) {
            this.uploadMessage = `Errore nel caricamento del chunk ${currentChunk}: ${response.error}`;
            this.isUploading = false;
            return;
          }
          if (response.uploadId && !this.uploadId) {
            this.uploadId = response.uploadId;
          }
          if (response.message.includes('File caricato con successo')) {
            this.uploadMessage = response.message;
            this.isUploading = false;
            return;
          }
        } else {
          this.uploadMessage = `Errore sconosciuto nel caricamento del chunk ${currentChunk}`;
          this.isUploading = false;
          return;
        }
      } catch (error: any) {
        this.uploadMessage = `Errore durante l'upload del chunk ${currentChunk}: ${error.message}`;
        this.isUploading = false;
        return;
      }

      currentChunk++;
    }

    this.isUploading = false;
    if (!this.uploadMessage.includes('successo') && this.uploadProgress === 100) {
      this.uploadMessage = 'Caricamento completato (potrebbe essere necessario attendere la riassemblaggio sul server).';
    }

  }
}