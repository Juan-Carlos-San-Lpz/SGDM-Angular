import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStatusPedidoComponent } from './gestion-status-pedido.component';

describe('GestionStatusPedidoComponent', () => {
  let component: GestionStatusPedidoComponent;
  let fixture: ComponentFixture<GestionStatusPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStatusPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionStatusPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
