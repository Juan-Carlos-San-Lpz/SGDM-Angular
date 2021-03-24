import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableUsuariosComponent } from './data-table-usuarios.component';

describe('DataTableUsuariosComponent', () => {
  let component: DataTableUsuariosComponent;
  let fixture: ComponentFixture<DataTableUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
