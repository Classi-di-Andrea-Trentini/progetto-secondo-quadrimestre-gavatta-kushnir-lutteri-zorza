import { Component, Input } from '@angular/core';
import { InfoGioco } from '../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valutazioni',
  imports: [CommonModule],
  templateUrl: './valutazioni.component.html',
  styleUrl: './valutazioni.component.css'
})
export class ValutazioniComponent {
  @Input() infoGioco: InfoGioco | null = null;

  get valutazioni(): string[] {
    return this.infoGioco?.ratings?.map(rating => rating.title) || [];
  }
  

}
