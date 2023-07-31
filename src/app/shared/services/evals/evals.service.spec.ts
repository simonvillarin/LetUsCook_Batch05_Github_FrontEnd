import { TestBed } from '@angular/core/testing';

import { EvalsService } from './evals.service';

describe('EvalsService', () => {
  let service: EvalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
