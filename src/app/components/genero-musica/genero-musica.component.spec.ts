import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroMusicaComponent } from './genero-musica.component';

describe('GeneroMusicaComponent', () => {
  let component: GeneroMusicaComponent;
  let fixture: ComponentFixture<GeneroMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneroMusicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
