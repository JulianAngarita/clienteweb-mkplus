import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnadirSoporte } from './modal-anadir-soporte';

describe('ModalAnadirSoporte', () => {
  let component: ModalAnadirSoporte;
  let fixture: ComponentFixture<ModalAnadirSoporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAnadirSoporte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnadirSoporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
