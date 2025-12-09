import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemparios } from './modal-temparios';

describe('ModalTemparios', () => {
  let component: ModalTemparios;
  let fixture: ComponentFixture<ModalTemparios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTemparios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTemparios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
