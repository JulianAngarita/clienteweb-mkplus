import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnadirPaquetes } from './modal-anadir-paquetes';

describe('ModalAnadirPaquetes', () => {
  let component: ModalAnadirPaquetes;
  let fixture: ComponentFixture<ModalAnadirPaquetes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAnadirPaquetes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnadirPaquetes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
