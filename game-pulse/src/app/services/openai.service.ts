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
