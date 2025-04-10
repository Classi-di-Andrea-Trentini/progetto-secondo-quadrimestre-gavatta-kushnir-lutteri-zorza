import { Component, Input } from '@angular/core';
import { InfoGioco } from '../../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-immagini',
  imports: [],
  templateUrl: './display-immagini.component.html',
  styleUrl: './display-immagini.component.css'
})
export class DisplayImmaginiComponent {
   @Input() infoGioco: InfoGioco | null = null;
}
