import { TestBed } from '@angular/core/testing';

import { ComapnyService } from './comapny.service';

describe('ComapnyService', () => {
  let service: ComapnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComapnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
