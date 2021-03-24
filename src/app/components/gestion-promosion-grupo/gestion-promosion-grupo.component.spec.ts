import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPromosionGrupoComponent } from './gestion-promosion-grupo.component';

describe('GestionPromosionGrupoComponent', () => {
  let component: GestionPromosionGrupoComponent;
  let fixture: ComponentFixture<GestionPromosionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPromosionGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPromosionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
