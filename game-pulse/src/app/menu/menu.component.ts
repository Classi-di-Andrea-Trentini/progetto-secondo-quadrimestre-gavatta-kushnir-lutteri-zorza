import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IAIResponse } from '../interfaces/i-airesponse';
import { OpenaiService } from '../services/openai.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  immagine = '/logo.png';
  menuOpen = false;
  sidebarOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
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
