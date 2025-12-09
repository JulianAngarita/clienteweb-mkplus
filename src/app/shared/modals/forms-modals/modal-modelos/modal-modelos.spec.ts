import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModelos } from './modal-modelos';

describe('ModalModelos', () => {
  let component: ModalModelos;
  let fixture: ComponentFixture<ModalModelos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModelos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalModelos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
