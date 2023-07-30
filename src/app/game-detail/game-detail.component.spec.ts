import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GameDetailComponent } from './game-detail.component';
import { ServiceGamesService } from 'src/services/service-games.service';
import { Id } from '../id';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let mockServiceGames: jasmine.SpyObj<ServiceGamesService>;

  beforeEach(() => {
    mockServiceGames = jasmine.createSpyObj('ServiceGamesService', [
      'getGameById',
    ]);

    TestBed.configureTestingModule({
      declarations: [GameDetailComponent],
      providers: [
        { provide: ServiceGamesService, useValue: mockServiceGames },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '1' }) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
