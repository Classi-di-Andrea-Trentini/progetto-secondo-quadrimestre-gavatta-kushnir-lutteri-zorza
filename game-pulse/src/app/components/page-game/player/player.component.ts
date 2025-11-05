import { Component } from '@angular/core';
import { DisplayImmaginiComponent } from "./display-immagini/display-immagini.component";

@Component({
  selector: 'app-player',
  imports: [PlayerComponent, DisplayImmaginiComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

}
