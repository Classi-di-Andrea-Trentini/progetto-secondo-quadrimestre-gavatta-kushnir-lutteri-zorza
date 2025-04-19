import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment2 } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItadService {
  private readonly apiUrl = environment2.ITAD_API_URL;
  private readonly apiKey = environment2.ITAD_API_KEY;

  constructor(private http: HttpClient) {}

  // Esempio: Ottieni i prezzi per un gioco
  getGamePrices(plain: string, region: string = 'us') {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('plains', plain)
      .set('region', region)
      .set('country', 'US');

    return this.http.get(`${this.apiUrl}/game/prices/`, { params });
  }
}

