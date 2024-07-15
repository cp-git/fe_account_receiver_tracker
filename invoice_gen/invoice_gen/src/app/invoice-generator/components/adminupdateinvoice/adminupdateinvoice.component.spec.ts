import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupdateinvoiceComponent } from './adminupdateinvoice.component';

describe('AdminupdateinvoiceComponent', () => {
  let component: AdminupdateinvoiceComponent;
  let fixture: ComponentFixture<AdminupdateinvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminupdateinvoiceComponent]
    });
    fixture = TestBed.createComponent(AdminupdateinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
