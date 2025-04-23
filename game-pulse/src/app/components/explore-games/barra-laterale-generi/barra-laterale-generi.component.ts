import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-laterale-generi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-laterale-generi.component.html',
  styleUrls: ['./barra-laterale-generi.component.css']
})
export class BarraLateraleGeneriComponent {
  @Output() genereSelezionato = new EventEmitter<string>();

  // Mappa dei generi italiani ai loro corrispettivi ID inglesi per l'API
  mappaGeneri: {[key: string]: string} = {
    'Azione': 'action',
    'Avventura': 'adventure',
    'RPG': 'role-playing-games-rpg',
    'Strategia': 'strategy',
    'Simulazione': 'simulation',
    'Sport': 'sports',
    'Corsa': 'racing',
    'Puzzle': 'puzzle',
    'Platform': 'platformer',
    'FPS': 'shooter',
    'Survival Horror': 'survival',
    'MMORPG': 'massively-multiplayer',
    'Picchiaduro': 'fighting',
    'Gestionale': 'board-games',
    'Open World': 'open-world',
    'Stealth': 'stealth',
    'Rogue-like': 'indie',
    'Tower Defense': 'tower-defense',
    'Visual Novel': 'card'
  };

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
    // Emette l'ID inglese del genere selezionato
    this.genereSelezionato.emit(this.mappaGeneri[genere]);
  }
}
