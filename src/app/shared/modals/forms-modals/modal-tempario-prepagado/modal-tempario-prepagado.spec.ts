import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemparioPrepagado } from './modal-tempario-prepagado';

describe('ModalTemparioPrepagado', () => {
  let component: ModalTemparioPrepagado;
  let fixture: ComponentFixture<ModalTemparioPrepagado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTemparioPrepagado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTemparioPrepagado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
