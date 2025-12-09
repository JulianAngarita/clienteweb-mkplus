import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCliente } from './formulario-cliente';

describe('FormularioCliente', () => {
  let component: FormularioCliente;
  let fixture: ComponentFixture<FormularioCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
