import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicios } from './modal-servicios';

describe('ModalServicios', () => {
  let component: ModalServicios;
  let fixture: ComponentFixture<ModalServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
