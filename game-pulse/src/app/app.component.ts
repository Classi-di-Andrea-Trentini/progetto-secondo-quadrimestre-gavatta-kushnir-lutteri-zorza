import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',

  imports: [MenuComponent, LoginComponent, RegisterComponent, MatSlideToggleModule,RouterOutlet,HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
}
