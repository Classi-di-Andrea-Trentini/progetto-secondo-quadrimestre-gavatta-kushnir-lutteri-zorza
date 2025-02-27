import { TestBed } from '@angular/core/testing';

import { GamePulseService } from './game-pulse.service';

describe('GamePulseService', () => {
  let service: GamePulseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePulseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
