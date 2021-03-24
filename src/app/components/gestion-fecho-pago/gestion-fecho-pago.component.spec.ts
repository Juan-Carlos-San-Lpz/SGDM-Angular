import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFechoPagoComponent } from './gestion-fecho-pago.component';

describe('GestionFechoPagoComponent', () => {
  let component: GestionFechoPagoComponent;
  let fixture: ComponentFixture<GestionFechoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFechoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFechoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
