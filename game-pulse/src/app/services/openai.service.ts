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
