import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  imports: [MenuComponent, LoginComponent, MatSlideToggleModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
}
