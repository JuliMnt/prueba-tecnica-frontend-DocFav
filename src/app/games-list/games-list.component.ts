import { Component, OnInit } from '@angular/core';
import { ServiceGamesService } from 'src/services/service-games.service';
import { Games } from '../games';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Selects } from '../selects';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  allGamesData: Observable<Array<Games>> = new Observable<Array<Games>>();
  searchTerm: string = '';
  filteredGames: Array<Games> = [];
  allSelects: Selects = {
    platformSelect: new Observable<Array<string>>(),
    genreSelect: new Observable<Array<string>>(),
  };
  genres: string[] = [];
  platforms: string[] = [];
  showWarningMessage: boolean = false;
  noResultsMessage: string = '';

  constructor(
    public serviceGames: ServiceGamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allGamesData = this.serviceGames.getAllGames();
    this.allSelects = this.serviceGames.getSelects(this.allGamesData);
    this.allSelects.genreSelect.subscribe((genres: string[]) => {
      this.genres = genres;
    });
    this.allSelects.platformSelect.subscribe((platforms: string[]) => {
      this.platforms = platforms;
    });
  }
  
  onKeyUp(event: any) {
    if (event.target.value.length <= 2 || this.searchTerm === '') {
      this.filteredGames = [];
      this.showWarningMessage = this.searchTerm.length > 0;
      this.noResultsMessage = '';
    } else {
      this.allGamesData
        .pipe(
          map((games) =>
            games.filter((game) =>
              game.title
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            )
          )
        )
        .subscribe((filteredGames) => {
          if (filteredGames.length === 0) {
            this.noResultsMessage = `No se encontraron resultados para "${this.searchTerm}"`;
            this.filteredGames = [];
          } else {
            this.noResultsMessage = '';
            this.filteredGames = filteredGames;
          }
          this.showWarningMessage = false;
          console.log('GAMES', filteredGames);
        });
    }
  }

  onSelectChange(selectedValue: string): void {
    this.serviceGames
      .getGamesByGender(selectedValue)
      .pipe(
        map((games) =>
          games.filter(
            (game) =>
              game.genre.toLowerCase().includes(selectedValue.toLowerCase()) ||
              game.platform.toLowerCase().includes(selectedValue.toLowerCase())
          )
        )
      )
      .subscribe((filteredGames) => {
        this.filteredGames = filteredGames;
        console.log('FILTEREDGAMES', filteredGames);
      });
  }

  goToGameDetail(id: number) {
    this.router.navigate([`detail/${id}`]);
  }
}
