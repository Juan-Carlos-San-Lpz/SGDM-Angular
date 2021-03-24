import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSubMenuComponent } from './gestion-sub-menu.component';

describe('GestionSubMenuComponent', () => {
  let component: GestionSubMenuComponent;
  let fixture: ComponentFixture<GestionSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
