import { TestBed } from '@angular/core/testing';

import { CompanyStaffService } from './company-staff.service';

describe('CompanyStaffService', () => {
  let service: CompanyStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
