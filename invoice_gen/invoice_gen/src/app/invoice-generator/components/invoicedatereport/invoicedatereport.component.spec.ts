import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedatereportComponent } from './invoicedatereport.component';

describe('InvoicedatereportComponent', () => {
  let component: InvoicedatereportComponent;
  let fixture: ComponentFixture<InvoicedatereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedatereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
