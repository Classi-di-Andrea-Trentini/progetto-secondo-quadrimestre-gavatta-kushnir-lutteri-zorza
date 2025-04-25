import { Component, inject } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { IAIResponse } from './interfaces/i-airesponse';
import { OpenaiService } from './services/openai.service';
import { MenuComponent } from './components/menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExploreGamesComponent } from './components/explore-games/explore-games.component';
import { HeaderComponent } from './components/header/header.component';



@Component({
  selector: 'app-root',

  imports: [MenuComponent, ExploreGamesComponent, LoginComponent, RegisterComponent, MatSlideToggleModule, RouterOutlet, HomeComponent, AccountComponent, FooterComponent, HeaderComponent],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
  iaResponse: WritableSignal<IAIResponse | null> = signal(null);
  viewSpinner: WritableSignal<boolean> = signal<boolean>(false);
  openaiService: OpenaiService = inject(OpenaiService);
  userInput: string = '';

  testAI() {
    this.viewSpinner.set(true);
    this.openaiService.ask('Che cosa sei in grado di fare? Formatta la risposta in text.').subscribe(result => {
      this.iaResponse.set(result);
      this.viewSpinner.set(false);
    })
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }

  searchText() {
    const query = this.userInput;
    this.viewSpinner.set(true);
    this.openaiService.ask(query).subscribe(result => {
      this.iaResponse.set(result);
      this.viewSpinner.set(false);
    });
  }
}