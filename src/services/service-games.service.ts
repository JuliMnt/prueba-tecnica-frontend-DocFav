import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Games } from 'src/app/games';

import { Id } from 'src/app/id';
import { Selects } from 'src/app/selects';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServiceGamesService {
  constructor(private http: HttpClient) {}

  public getAllGames(): Observable<Array<Games>> {
    const gamesUrl = `${environment.serviceUrl}/games`;
    return this.http.get<Array<Games>>(gamesUrl);
  }

  public getGamesByPlatform(platform: string): Observable<Games[]> {
    const platformUrl = `${environment.serviceUrl}/games?platform=${platform}`;
    return this.http.get<Array<Games>>(platformUrl);
  }

  public getGamesByGender(category: string): Observable<Games[]> {
    const categoryUrl = `${environment.serviceUrl}/games?genre=${category}`;
    return this.http.get<Array<Games>>(categoryUrl);
  }

  public getGameById(id: number): Observable<Id> {
    const gameUrl = `${environment.serviceUrl}/game?id=${id}`;
    return this.http.get<Id>(gameUrl);
  }

  public getSelects(gameList: Observable<Array<Games>>): Selects {
    const platforms: Array<string> = [],
      genres: Array<string> = [];
    gameList.subscribe((games) => {
      games.forEach((game) => {
        if (game.platform !== null && !platforms.includes(game.platform)) {
          platforms.push(game.platform);
        }
        if (game.genre !== null && !genres.includes(game.genre)) {
          genres.push(game.genre);
        }
      });
    });
    const returnValue: Selects = {
      platformSelect: of(platforms),
      genreSelect: of(genres),
    };
    return returnValue;
  }
}
