import { Component } from '@angular/core';
import {} from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  immagine = '/logo.png';
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
