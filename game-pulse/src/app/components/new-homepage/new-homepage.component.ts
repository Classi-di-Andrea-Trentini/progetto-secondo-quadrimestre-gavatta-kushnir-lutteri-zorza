import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaPageComponent } from './prima-page/prima-page.component';
import { SecondaPageComponent } from './seconda-page/seconda-page.component';
import { TerzaPageComponent } from './terza-page/terza-page.component';

@Component({
  selector: 'app-new-homepage',
  standalone: true,
  imports: [CommonModule, PrimaPageComponent,SecondaPageComponent,TerzaPageComponent],
  templateUrl: './new-homepage.component.html',
  styleUrl: './new-homepage.component.css'
})
export class NewHomepageComponent {
  
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Rallentiamo lo scrolling utilizzando un'animazione più lunga
      const startPosition = window.pageYOffset;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // Durata in millisecondi (più alta = più lento)
      let start: number | null = null;
      
      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Funzione di easing per rendere lo scrolling più naturale
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      
      window.requestAnimationFrame(step);
    }
  }
}
