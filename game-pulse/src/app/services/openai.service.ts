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
