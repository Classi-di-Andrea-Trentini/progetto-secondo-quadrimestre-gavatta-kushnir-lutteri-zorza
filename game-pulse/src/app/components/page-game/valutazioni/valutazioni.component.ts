import { Component, Input, OnInit } from '@angular/core';
import { InfoGioco } from '../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

@Component({
  selector: 'app-valutazioni',
  imports: [CommonModule],
  templateUrl: './valutazioni.component.html',
  styleUrl: './valutazioni.component.css'
})
export class ValutazioniComponent implements OnInit {
  @Input() infoGioco: InfoGioco | null = null;

  get valutazioni(): Rating[] {
    return this.infoGioco?.ratings || [];
  }
  
  // Funzione per determinare il colore del badge in base al titolo della valutazione
  getRatingColor(title: string): string {
    switch(title.toLowerCase()) {
      case 'exceptional': return 'exceptional';
      case 'recommended': return 'recommended';
      case 'meh': return 'meh';
      case 'skip': return 'skip';
      default: return 'default';
    }
  }
  
  ngOnInit(): void {
    console.log("valutazioni");
    console.log(this.valutazioni);
  }
}
