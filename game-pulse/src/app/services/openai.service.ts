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
