import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnadirOperacion } from './modal-anadir-operacion';

describe('ModalAnadirOperacion', () => {
  let component: ModalAnadirOperacion;
  let fixture: ComponentFixture<ModalAnadirOperacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAnadirOperacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnadirOperacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
