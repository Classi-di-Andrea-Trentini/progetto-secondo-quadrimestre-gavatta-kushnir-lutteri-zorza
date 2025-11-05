import { EventEmitter, inject, Injectable, Output, signal, WritableSignal } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  router: Router = inject(Router);
  private genereSubject = new BehaviorSubject<string>('Azione'); // Valore iniziale
  genere$ = this.genereSubject.asObservable();

  // Metodo per ottenere il valore corrente
  genere(): string {
    return this.genereSubject.getValue();
  }

  // Metodo per aggiornare il valore
  setGenere(genere: string): void {
    this.genereSubject.next(genere);
    this.router.navigate(['/category']);
  }
}
