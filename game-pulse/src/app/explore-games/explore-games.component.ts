import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateraleGeneriComponent } from './barra-laterale-generi/barra-laterale-generi.component';


@Component({
  selector: 'app-explore-games',
  standalone: true,
  imports: [CommonModule, BarraLateraleGeneriComponent],
  templateUrl: './explore-games.component.html',
  styleUrl: './explore-games.component.css'
})
export class ExploreGamesComponent {

}
