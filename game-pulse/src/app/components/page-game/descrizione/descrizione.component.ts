import { Component, Input } from '@angular/core';
import { InfoGioco } from '../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descrizione',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descrizione.component.html',
  styleUrl: './descrizione.component.css'
})
export class DescrizioneComponent {
  @Input() infoGioco: InfoGioco | null = null;
}
