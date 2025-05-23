import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  private authService:AuthService = inject(AuthService);
  currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);
  private router: Router = inject(Router);
  constructor() { 
    
    effect(() => {
      const user = this.authService.currentUser();
    if(user){
      console.log('Utente loggato:', user);
      this.currentUser.set(user);
    }else{
      console.log('Utente non loggato');
    }
    });
  
  }

  ngOnInit(): void {
    // Inizializza l'utente corrente
    if (this.authService.currentUser() == null) {
      this.router.navigate(['/login']);
    }
  }
  
  profileImages: string[] = [
    'profilouomo.png',  // Prima immagine
    'profilodonna.png'   // Seconda immagine
  ];
  // Indice dell'immagine attuale
  currentImageIndex: number = 0;
  // Immagine attualmente visualizzata
  profileImage: string = this.profileImages[this.currentImageIndex];

  // Funzione per cambiare immagine
  changeImage(direction: number): void {
    this.currentImageIndex += direction;

    // Gestiamo il ciclo delle immagini
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.profileImages.length - 1; // Torna alla prima immagine
    } else if (this.currentImageIndex >= this.profileImages.length) {
      this.currentImageIndex = 0; // Torna all'ultima immagine
    }

    this.profileImage = this.profileImages[this.currentImageIndex];
  }
  


}
 