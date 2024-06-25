import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMembersListComponent } from './company-members-list.component';

describe('CompanyMembersListComponent', () => {
  let component: CompanyMembersListComponent;
  let fixture: ComponentFixture<CompanyMembersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyMembersListComponent]
    });
    fixture = TestBed.createComponent(CompanyMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
