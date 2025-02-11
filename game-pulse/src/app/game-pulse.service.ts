import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchGames } from './search-games';
@Injectable({
  providedIn: 'root'
})
export class GamePulseService {

  private url: string = "https://api.rawg.io/api/games?key=9abd9c1ccd8c48a88b995b17c20b2d94"
  private key: string = "key=9abd9c1ccd8c48a88b995b17c20b2d94" // e' una key che si richiede una volta solo quindi lo gia messo nel url
  constructor() { }
  private httpClient: HttpClient = inject(HttpClient);

  searchGame(name: string): Observable<SearchGames> {
    const urlcompleted = `${this.url}&search=${encodeURIComponent(name)}`;
    return this.httpClient.get<SearchGames>(urlcompleted);
  }

}
