import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepuestos } from './modal-repuestos';

describe('ModalRepuestos', () => {
  let component: ModalRepuestos;
  let fixture: ComponentFixture<ModalRepuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRepuestos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRepuestos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
