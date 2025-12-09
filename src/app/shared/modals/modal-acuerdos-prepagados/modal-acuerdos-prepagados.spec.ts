import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcuerdosPrepagados } from './modal-acuerdos-prepagados';

describe('ModalAcuerdosPrepagados', () => {
  let component: ModalAcuerdosPrepagados;
  let fixture: ComponentFixture<ModalAcuerdosPrepagados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAcuerdosPrepagados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAcuerdosPrepagados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
