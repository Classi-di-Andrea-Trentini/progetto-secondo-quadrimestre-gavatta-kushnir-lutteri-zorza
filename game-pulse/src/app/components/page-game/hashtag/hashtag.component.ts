import { Component, Input } from '@angular/core';
import { InfoGioco } from '../../../classes/info-gioco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hashtag',
  imports: [CommonModule],
  templateUrl: './hashtag.component.html',
  styleUrl: './hashtag.component.css'
})
export class HashtagComponent {
  @Input() infoGioco: InfoGioco | null = null;
  

  get hashtags(): string[] {
    return this.infoGioco?.genres?.map(tag => tag.name) || [];
  }
}
