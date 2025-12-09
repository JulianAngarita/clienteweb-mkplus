import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionModelo } from './seleccion-modelo';

describe('SeleccionModelo', () => {
  let component: SeleccionModelo;
  let fixture: ComponentFixture<SeleccionModelo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionModelo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionModelo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
