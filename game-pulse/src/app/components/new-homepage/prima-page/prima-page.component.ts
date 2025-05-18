import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prima-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prima-page.component.html',
  styleUrl: './prima-page.component.css'
})
export class PrimaPageComponent implements OnInit, OnDestroy {
  images: string[] = [
    '/herosection1.jpg',
    '/herosection2.jpg',
    '/herosection3.jpg',
    '/cs16.jpg',
    '/Dota2.jpg'
  ];
  
  currentIndex: number = 0;
  currentBackgroundIndex: number = 0;
  nextBackgroundIndex: number = 0;
  activeBackground: string = 'first';
  private autoRotationInterval: any;
  
  // Flag per prevenire le interazioni durante una transizione (public per accedervi dal template)
  isTransitioning: boolean = false;
  
  // Tempo di debounce in millisecondi (300ms è un buon compromesso)
  private readonly debounceTime: number = 300;
  
  ngOnInit(): void {
    // Inizializza gli indici del background
    this.currentBackgroundIndex = this.currentIndex;
    this.nextBackgroundIndex = this.currentIndex;
    
    // Start automatic slider rotation
    this.startAutoRotation();
  }
  
  ngOnDestroy(): void {
    // Pulisce l'intervallo quando il componente viene distrutto
    if (this.autoRotationInterval) {
      clearInterval(this.autoRotationInterval);
    }
  }
  
  startAutoRotation(): void {
    // Pulisce qualsiasi intervallo esistente prima di crearne uno nuovo
    if (this.autoRotationInterval) {
      clearInterval(this.autoRotationInterval);
    }
    
    this.autoRotationInterval = setInterval(() => {
      // Controlla che non ci siano transizioni in corso prima di passare alla slide successiva
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, 5000); // Cambia slide ogni 5 secondi
  }
  
  resetAutoRotation(): void {
    // Reset del timer automatico quando l'utente interagisce con la carousel
    this.startAutoRotation();
  }
  
  prevSlide(): void {
    // Verifica se è in corso una transizione
    if (this.isTransitioning) {
      return; // Non fa niente se è già in corso una transizione
    }
    
    this.isTransitioning = true; // Imposta la flag per prevenire nuove interazioni
    
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.updateSlide(newIndex);
    this.resetAutoRotation(); // Reset del timer quando si preme la freccia sinistra
    
    // Reimposta la flag dopo il tempo di debounce
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceTime);
  }
  
  nextSlide(): void {
    const newIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlide(newIndex);
    // Non resettiamo qui il timer se la funzione viene chiamata dal timer stesso
    // Solo se è una chiamata diretta (dal click dell'utente)
  }
  
  // Questo metodo viene chiamato direttamente dal template quando l'utente fa click sulla freccia destra
  userNextSlide(): void {
    // Verifica se è in corso una transizione
    if (this.isTransitioning) {
      return; // Non fa niente se è già in corso una transizione
    }
    
    this.isTransitioning = true; // Imposta la flag per prevenire nuove interazioni
    
    this.nextSlide();
    this.resetAutoRotation(); // Reset del timer quando si preme la freccia destra
    
    // Reimposta la flag dopo il tempo di debounce
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceTime);
  }
  
  goToSlide(index: number): void {
    // Verifica se è in corso una transizione o se l'indice selezionato è già quello corrente
    if (this.isTransitioning || index === this.currentIndex) {
      return; // Non fa niente in questi casi
    }
    
    this.isTransitioning = true; // Imposta la flag per prevenire nuove interazioni
    
    this.updateSlide(index);
    this.resetAutoRotation(); // Reset del timer quando si seleziona un'immagine specifica
    
    // Reimposta la flag dopo il tempo di debounce
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceTime);
  }
  
  updateSlide(newIndex: number): void {
    // Aggiorna l'indice corrente
    this.currentIndex = newIndex;
    
    // Prepara il background successivo
    this.prepareBackgroundTransition(newIndex);
  }
  
  prepareBackgroundTransition(newIndex: number): void {
  try {
    if (this.activeBackground === 'first') {
      // Aggiorna immediatamente il background secondario
      this.nextBackgroundIndex = newIndex;
      // Cambia l'opacità dopo un breve ritardo
      setTimeout(() => {
        this.activeBackground = 'second';
        // Aggiorna il background primario appena completato il cambio
        this.currentBackgroundIndex = newIndex;
      }, 50);
    } else {
      // Aggiorna immediatamente il background primario
      this.currentBackgroundIndex = newIndex;
      // Cambia l'opacità dopo un breve ritardo
      setTimeout(() => {
        this.activeBackground = 'first';
        // Aggiorna il background secondario appena completato il cambio
        this.nextBackgroundIndex = newIndex;
      }, 50);
    }
  } catch (error) {
    console.error('Errore durante la transizione del background:', error);
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceTime);
  }
}
}
