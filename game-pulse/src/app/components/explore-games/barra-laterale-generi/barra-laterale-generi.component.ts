import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-laterale-generi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-laterale-generi.component.html',
  styleUrls: ['./barra-laterale-generi.component.css']
})
export class BarraLateraleGeneriComponent {
  generi: string[] = [
    'Azione',
    'Avventura',
    'RPG',
    'Strategia',
    'Simulazione',
    'Sport',
    'Corsa',
    'Puzzle',
    'Platform',
    'FPS',
    'Survival Horror',
    'MMORPG',
    'Picchiaduro',
    'Gestionale',
    'Open World',
    'Stealth',
    'Rogue-like',
    'Tower Defense',
    'Visual Novel'
  ];

  onGenereClick(genere: string): void {
    console.log(`Genere selezionato: ${genere}`);
  }
}
