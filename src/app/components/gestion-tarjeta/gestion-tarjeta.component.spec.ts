import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTarjetaComponent } from './gestion-tarjeta.component';

describe('GestionTarjetaComponent', () => {
  let component: GestionTarjetaComponent;
  let fixture: ComponentFixture<GestionTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
