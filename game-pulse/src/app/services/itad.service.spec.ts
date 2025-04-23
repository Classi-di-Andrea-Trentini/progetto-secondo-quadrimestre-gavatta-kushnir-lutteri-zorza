import { TestBed } from '@angular/core/testing';

import { ItadService } from './itad.service';

describe('ItadService', () => {
  let service: ItadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
