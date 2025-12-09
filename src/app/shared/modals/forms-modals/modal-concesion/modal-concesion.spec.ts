import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConcesion } from './modal-concesion';

describe('ModalConcesion', () => {
  let component: ModalConcesion;
  let fixture: ComponentFixture<ModalConcesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConcesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConcesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
