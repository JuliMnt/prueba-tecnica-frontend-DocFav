import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ServiceGamesService } from './service-games.service';
import { environment } from 'src/environments/environments';
import { Games } from 'src/app/games';

describe('ServiceGamesService', () => {
  let service: ServiceGamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceGamesService],
    });
    service = TestBed.inject(ServiceGamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all games', () => {
    const mockGames: Games[] = [
      {
        developer: 'Developer 1',
        freetogame_profile_url: 'https://www.freetogame.com/profile/game1',
        game_url: 'https://www.freetogame.com/game/game1',
        genre: 'Action',
        id: 1,
        platform: 'PC',
        publisher: 'Publisher 1',
        release_date: '2023-01-01',
        short_description: 'Short description of game 1',
        thumbnail: 'https://www.freetogame.com/thumbnails/game1.jpg',
        title: 'Game 1',
      },
    ];
    service.getAllGames().subscribe((games) => {
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/games`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('should get games by platform', () => {
    const platform = 'platform_name';
    const mockGames: Games[] = [
      {
        developer: 'Developer 1',
        freetogame_profile_url: 'https://www.freetogame.com/profile/game1',
        game_url: 'https://www.freetogame.com/game/game1',
        genre: 'Action',
        id: 1,
        platform: 'PC',
        publisher: 'Publisher 1',
        release_date: '2023-01-01',
        short_description: 'Short description of game 1',
        thumbnail: 'https://www.freetogame.com/thumbnails/game1.jpg',
        title: 'Game 1',
      },
    ];
    service.getGamesByPlatform(platform).subscribe((games) => {
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne(
      `${environment.serviceUrl}/games?platform=${platform}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('should get games by genre', () => {
    const genre = 'genre';
    const mockGames = [
      {
        developer: 'Developer 1',
        freetogame_profile_url: 'https://www.freetogame.com/profile/game1',
        game_url: 'https://www.freetogame.com/game/game1',
        genre: 'Action',
        id: 1,
        platform: 'PC',
        publisher: 'Publisher 1',
        release_date: '2023-01-01',
        short_description: 'Short description of game 1',
        thumbnail: 'https://www.freetogame.com/thumbnails/game1.jpg',
        title: 'Game 1',
      },
    ];
    service.getGamesByGender(genre).subscribe((games) => {
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne(
      `${environment.serviceUrl}/games?genre=${genre}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('should get game by id', () => {
    const id = 1;
    const mockGame = {
      id: 1,
      title: 'Game 1',
      thumbnail: 'https://www.freetogame.com/thumbnails/game1.jpg',
      status: 'status',
      short_description: 'Short description of game 1',
      description: 'Description of game 1',
      game_url: 'https://www.freetogame.com/game/game1',
      genre: 'Action',
      platform: 'PC',
      publisher: 'Publisher 1',
      developer: 'Developer 1',
      release_date: '2023-01-01',
      freetogame_profile_url: 'https://www.freetogame.com/profile/game1',
      screenshots: [
        {
          id: 11,
          image: 'https://www.freetogame.com/g/11/thumbnail.jpg',
        },
        {
          id: 12,
          image: 'https://www.freetogame.com/g/12/thumbnail.jpg',
        },
        {
          id: 13,
          image: 'https://www.freetogame.com/g/13/thumbnail.jpg',
        },
      ],
    };
    service.getGameById(id).subscribe((game) => {
      expect(game).toEqual(jasmine.objectContaining(mockGame));
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/game?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGame);
  });
});
