import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarios } from './modal-usuarios';

describe('ModalUsuarios', () => {
  let component: ModalUsuarios;
  let fixture: ComponentFixture<ModalUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
