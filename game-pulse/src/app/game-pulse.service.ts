import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchGames } from './search-games';
import { InfoGioco } from './info-gioco';
@Injectable({
  providedIn: 'root'
})
export class GamePulseService {
  private urlprice: string = "https://www.cheapshark.com/redirect?dealID=";
  private url: string = "https://api.rawg.io/api/games"
  private key: string = "?key=9abd9c1ccd8c48a88b995b17c20b2d94" // e' una key che si richiede una volta solo quindi lo gia messo nel url
  constructor() { }
  private httpClient: HttpClient = inject(HttpClient);

  searchGames(name: string): Observable<SearchGames> {
    const urlcompleted = `${this.url}${this.key}&search=${encodeURIComponent(name)}`;
    return this.httpClient.get<SearchGames>(urlcompleted);
  }

  searchGameById(id: String): Observable<InfoGioco> {
    const urlcompleted = `${this.url}/${id}${this.key}`;
    return this.httpClient.get<InfoGioco>(urlcompleted);
  }


  requestDealPrice(gameName: string): Observable<any> {
    const url = "https://api.rawg.io/api/games";
    const params = new HttpParams().set('key', '9abd9c1ccd8c48a88b995b17c20b2d94').set('search', gameName);
    return this.httpClient.get(url, { params });
  }





}
