import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateinvoiceComponent } from './updateinvoice.component';

describe('UpdateinvoiceComponent', () => {
  let component: UpdateinvoiceComponent;
  let fixture: ComponentFixture<UpdateinvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateinvoiceComponent]
    });
    fixture = TestBed.createComponent(UpdateinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
