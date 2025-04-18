import { Component, Input } from '@angular/core';
import { InfoGioco } from '../../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-immagini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-immagini.component.html',
  styleUrl: './display-immagini.component.css'
})
export class DisplayImmaginiComponent {
   @Input() infoGioco: InfoGioco | null = null;
   
   // Metodo helper per verificare se ci sono screenshot disponibili
   hasScreenshots(): boolean {
     return this.infoGioco?.screenshots != null && this.infoGioco.screenshots.length > 0;
   }
}
