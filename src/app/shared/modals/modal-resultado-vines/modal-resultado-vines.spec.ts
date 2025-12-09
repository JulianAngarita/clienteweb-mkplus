import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultadoVines } from './modal-resultado-vines';

describe('ModalResultadoVines', () => {
  let component: ModalResultadoVines;
  let fixture: ComponentFixture<ModalResultadoVines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResultadoVines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResultadoVines);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
