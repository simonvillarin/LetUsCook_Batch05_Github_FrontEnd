import { TestBed } from '@angular/core/testing';

import { ProfessorloadService } from './professorload.service';

describe('ProfessorloadService', () => {
  let service: ProfessorloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
