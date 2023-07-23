import { TestBed } from '@angular/core/testing';

import { AttendanceProfService } from './attendance-prof.service';

describe('AttendanceProfService', () => {
  let service: AttendanceProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
