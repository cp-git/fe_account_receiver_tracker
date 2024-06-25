import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyMemberComponent } from './update-company-member.component';

describe('UpdateCompanyMemberComponent', () => {
  let component: UpdateCompanyMemberComponent;
  let fixture: ComponentFixture<UpdateCompanyMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanyMemberComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
