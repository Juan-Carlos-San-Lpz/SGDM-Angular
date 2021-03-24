import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaDireccionComponent } from './prueba-direccion.component';

describe('PruebaDireccionComponent', () => {
  let component: PruebaDireccionComponent;
  let fixture: ComponentFixture<PruebaDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaDireccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
