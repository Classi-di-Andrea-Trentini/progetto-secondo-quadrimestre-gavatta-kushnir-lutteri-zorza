import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenaiService } from './services/openai.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-pulse';
  openaiService: OpenaiService = inject(OpenaiService);

  testAI() {
    this.openaiService.ask('Questo è un test di chatgpt').subscribe(result => {
      console.log(result);
    })
  }
}
