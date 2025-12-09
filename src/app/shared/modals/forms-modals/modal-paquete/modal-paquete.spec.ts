import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPaquete } from './modal-paquete';

describe('ModalPaquete', () => {
  let component: ModalPaquete;
  let fixture: ComponentFixture<ModalPaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPaquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPaquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
