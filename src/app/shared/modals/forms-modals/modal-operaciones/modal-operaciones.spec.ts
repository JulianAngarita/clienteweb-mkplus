import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperaciones } from './modal-operaciones';

describe('ModalOperaciones', () => {
  let component: ModalOperaciones;
  let fixture: ComponentFixture<ModalOperaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOperaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOperaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
