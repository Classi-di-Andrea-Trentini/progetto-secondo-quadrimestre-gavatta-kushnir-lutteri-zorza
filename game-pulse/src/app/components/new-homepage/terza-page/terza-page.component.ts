import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terza-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terza-page.component.html',
  styleUrl: './terza-page.component.css'
})
export class TerzaPageComponent implements OnInit, OnDestroy {
  // Flag per controllare l'animazione
  isChanging = false;
  
  // Array con tutti i generi di giochi disponibili
  allGameCategories = [
    {
      title: 'Azione',
      genre: 'Action Games',
      description: 'Giochi ricchi di adrenalina con combattimenti e sfide in tempo reale.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Strategia',
      genre: 'Strategy Games',
      description: 'Giochi che richiedono pianificazione tattica e pensiero strategico.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'RPG',
      genre: 'Role Playing Games',
      description: 'Giochi di ruolo con personaggi complessi e mondi immersivi.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Simulazione',
      genre: 'Simulation Games',
      description: 'Esperienze realistiche che simulano attività del mondo reale.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Avventura',
      genre: 'Adventure Games',
      description: 'Giochi basati sulla narrazione con enigmi e esplorazione.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Sport',
      genre: 'Sports Games',
      description: 'Videogiochi che simulano sport reali per competizioni virtuali.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Corse',
      genre: 'Racing Games',
      description: 'Giochi di velocità con veicoli su pista o ambientazioni open world.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Puzzle',
      genre: 'Puzzle Games',
      description: 'Giochi di logica che sfidano la mente con enigmi e rompicapi.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Musicali',
      genre: 'Music Games',
      description: 'Giochi basati sul ritmo e sulle performance musicali.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Horror',
      genre: 'Horror Games',
      description: 'Esperienze spaventose con atmosfere inquietanti e suspense.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Sandbox',
      genre: 'Sandbox Games',
      description: 'Mondi aperti dove creare e interagire liberamente con l\'ambiente.',
      image: '/assets/placeholder.jpg'
    },
    {
      title: 'Picchiaduro',
      genre: 'Fighting Games',
      description: 'Combattimenti uno contro uno con mosse speciali e combo.',
      image: '/assets/placeholder.jpg'
    }
  ];

  // Array per le categorie attualmente visualizzate (inizialmente vuoto)
  gameCategories: any[] = [];
  
  // Riferimento all'intervallo per poterlo cancellare quando il componente viene distrutto
  private intervalId: any;

  ngOnInit(): void {
    // Inizializza le categorie all'avvio del componente
    this.randomizeCategories();
    
    // Imposta l'intervallo per cambiare le categorie ogni 15 secondi
    this.intervalId = setInterval(() => {
      this.randomizeCategories();
    }, 15000);
  }

  ngOnDestroy(): void {
    // Pulisco l'intervallo quando il componente viene distrutto
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Funzione per selezionare 4 categorie casuali senza duplicati
  randomizeCategories(): void {
    // Imposto il flag di animazione
    this.isChanging = true;
    
    // Creo una copia dell'array originale per non modificarlo
    const availableCategories = [...this.allGameCategories];
    const selectedCategories: any[] = [];
    
    // Seleziono 4 categorie casuali
    for (let i = 0; i < 4; i++) {
      if (availableCategories.length > 0) {
        // Genero un indice casuale
        const randomIndex = Math.floor(Math.random() * availableCategories.length);
        
        // Aggiungo la categoria selezionata all'array delle selezionate
        selectedCategories.push(availableCategories[randomIndex]);
        
        // Rimuovo la categoria dall'array disponibile per evitare duplicati
        availableCategories.splice(randomIndex, 1);
      }
    }
    
    // Prima rimuovo le vecchie categorie con animazione di fade out
    setTimeout(() => {
      // Poi aggiorno l'array delle categorie visualizzate
      this.gameCategories = selectedCategories;
      
      // Reimposto il flag dopo un breve ritardo per permettere l'animazione di fade in
      setTimeout(() => {
        this.isChanging = false;
      }, 50);
    }, 300); // Tempo di animazione del fade out
  }
}
