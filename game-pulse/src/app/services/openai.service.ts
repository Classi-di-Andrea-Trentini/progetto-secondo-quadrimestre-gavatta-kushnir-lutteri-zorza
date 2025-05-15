import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAIResponse } from '../interfaces/i-airesponse';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  httpClient: HttpClient = inject(HttpClient);
  apiKey: string = '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';
  openAIURL: string = 'https://openrouter.ai/api/v1/chat/completions';
  constructor() { }



  ask(prompt: string): Observable<IAIResponse> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`)
    const body = {
      model: 'deepseek/deepseek-r1',
      messages: [
        {
          role: 'user',
          'content': prompt
        }
      ]
    }

    return this.httpClient.post<IAIResponse>(this.openAIURL, body, {
      headers: headers
    });
  }

}
