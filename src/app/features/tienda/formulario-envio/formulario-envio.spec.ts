import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEnvio } from './formulario-envio';

describe('FormularioEnvio', () => {
  let component: FormularioEnvio;
  let fixture: ComponentFixture<FormularioEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
