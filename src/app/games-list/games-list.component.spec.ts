import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GamesListComponent } from './games-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { ServiceGamesService } from 'src/services/service-games.service';
import { Games } from '../games';
import { Selects } from '../selects';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('GamesListComponent', () => {
  let service: ServiceGamesService;
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let mockGames: Games[];
  let mockServiceGames: jasmine.SpyObj<ServiceGamesService>;

  beforeEach(async () => {
    const serviceGamesSpy = jasmine.createSpyObj('ServiceGamesService', [
      'getAllGames',
      'getSelects',
      'getGamesByGender',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [GamesListComponent],
      providers: [{ provide: ServiceGamesService, useValue: serviceGamesSpy }],
    }).compileComponents();

    mockServiceGames = TestBed.inject(
      ServiceGamesService
    ) as jasmine.SpyObj<ServiceGamesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
