import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ServiceGamesService } from 'src/services/service-games.service';
import { Id } from '../id';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  gameDetail: Observable<Id> = new Observable<Id>();
  filteredGames: Array<Id> = [];

  constructor(
    public serviceGames: ServiceGamesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gameDetail = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = Number(params.get('id'));
        return this.serviceGames.getGameById(id);
      })
    );
    }
}
