import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicegenComponent } from './invoicegen.component';

describe('InvoicegenComponent', () => {
  let component: InvoicegenComponent;
  let fixture: ComponentFixture<InvoicegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicegenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
