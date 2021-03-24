import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTipoUsuarioComponent } from './gestion-tipo-usuario.component';

describe('GestionTipoUsuarioComponent', () => {
  let component: GestionTipoUsuarioComponent;
  let fixture: ComponentFixture<GestionTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTipoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
