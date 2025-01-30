import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [MenuComponent, MatSlideToggleModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
}
