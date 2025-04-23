import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchGames } from '../classes/search-games';
import { InfoGioco } from '../classes/info-gioco';
@Injectable({
  providedIn: 'root'
})
export class GamePulseService {

  private url: string = "https://api.rawg.io/api/games"
  private key: string = "?key=9abd9c1ccd8c48a88b995b17c20b2d94" // e' una key che si richiede una volta solo quindi lo gia messo nel url
  private key2: string = "9abd9c1ccd8c48a88b995b17c20b2d94" //a me serviva la key per fare le chiamate, quindi l'ho messa qui senza il ?key= iniziale così non si rompe tutto
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

  getTopRatedGames() {
    const params = new HttpParams()
      .set('key', this.key2)
      .set('page_size', '20')
      .set('ordering', '-rating_top');

    return this.httpClient.get(this.url, { params });
  }

  getGamesByGenre(genreId: string, pageSize: number = 25) {
    const params = new HttpParams()
      .set('key', this.key2)
      .set('genres', genreId)
      .set('page_size', pageSize.toString());

    return this.httpClient.get(this.url, { params });
  }
}



