import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnadirServicios } from './modal-anadir-servicios';

describe('ModalAnadirServicios', () => {
  let component: ModalAnadirServicios;
  let fixture: ComponentFixture<ModalAnadirServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAnadirServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnadirServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
