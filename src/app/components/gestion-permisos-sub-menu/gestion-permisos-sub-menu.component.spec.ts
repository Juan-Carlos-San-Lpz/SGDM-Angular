import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPermisosSubMenuComponent } from './gestion-permisos-sub-menu.component';

describe('GestionPermisosSubMenuComponent', () => {
  let component: GestionPermisosSubMenuComponent;
  let fixture: ComponentFixture<GestionPermisosSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPermisosSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPermisosSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
