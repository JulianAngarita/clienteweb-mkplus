import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasPresentacionModelos } from './vistas-presentacion-modelos';

describe('VistasPresentacionModelos', () => {
  let component: VistasPresentacionModelos;
  let fixture: ComponentFixture<VistasPresentacionModelos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistasPresentacionModelos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistasPresentacionModelos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
