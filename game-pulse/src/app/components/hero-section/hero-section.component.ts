import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  standalone: true
})
export class HeroSectionComponent {
  slides = [
    {
      id: 1,
      backgroundImage: '/herosection1.jpg',
      title: {
        first: 'Esplora',
        second: 'Giochi'
      },
      subtitle: 'Scopri i Migliori Videogiochi',
      description: 'Qui puoi trovare i giochi più votati dalla community, le ultime uscite e i titoli di tendenza. Naviga tra le nostre recensioni dettagliate, confronta valutazioni e trova facilmente il tuo prossimo gioco preferito. La nostra selezione curata ti aiuta a scoprire esperienze di gioco uniche per ogni piattaforma.',
      buttons: [

        { text: 'Latest News', url: '/home', type: 'primary' },
        { text: 'Trending Games', url: '/category', type: 'secondary' }
      ]
    },
    {
      id: 2,
      backgroundImage: '/herosection2.jpg',
      title: {
        first: 'Gaming',
        second: 'Reviews'
      },
      subtitle: 'Opinioni di Esperti sulle Ultime Uscite',
      description: 'Analisi dettagliate e recensioni professionali dei giochi più recenti. Il nostro team di esperti testa e valuta ogni aspetto per aiutarti a fare scelte di gioco informate. Scopri cosa vale la pena giocare e cosa potresti voler evitare.',
      buttons: [

        { text: 'Account', url: '/user', type: 'primary' },
        { text: 'Community work in progress', url: '/community', type: 'secondary' }

      ]
    },
    {
      id: 3,
      backgroundImage: '/herosection3.jpg',
      title: {
        first: 'Gaming',
        second: 'Community'
      },
      subtitle: 'Connettiti con Altri Giocatori',
      description: 'Unisciti alla nostra fiorente comunità di appassionati di videogiochi. Condividi le tue esperienze, trova compagni di squadra, partecipa alle discussioni e resta connesso con giocatori che la pensano come te. Giocare insieme è meglio!',
      buttons: [

        { text: 'Join Now work in progress', url: '/community', type: 'primary' },
        { text: 'Gaming Forums work in progress-', url: '/forums', type: 'secondary' }
      ]
    }
  ];

  activeSlide = 0;
}
