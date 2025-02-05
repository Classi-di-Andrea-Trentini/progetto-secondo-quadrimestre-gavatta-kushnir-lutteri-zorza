import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenaiService } from './services/openai.service';
import { IAIResponse } from './interfaces/i-airesponse';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
  iaResponse: WritableSignal<IAIResponse | null> = signal(null);
  viewSpinner: WritableSignal<boolean> = signal<boolean>(false);
  openaiService: OpenaiService = inject(OpenaiService);

  testAI() {
    this.viewSpinner.set(true);
    this.openaiService.ask('Che cosa sei in grado di fare? Formatta la risposta in text.').subscribe(result => {
      this.iaResponse.set(result);
      this.viewSpinner.set(false);
    })
  }
}
