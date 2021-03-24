import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetallePedidoComponent } from './gestion-detalle-pedido.component';

describe('GestionDetallePedidoComponent', () => {
  let component: GestionDetallePedidoComponent;
  let fixture: ComponentFixture<GestionDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDetallePedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
