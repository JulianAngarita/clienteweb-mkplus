import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepuestosCsv } from './modal-repuestos-csv';

describe('ModalRepuestosCsv', () => {
  let component: ModalRepuestosCsv;
  let fixture: ComponentFixture<ModalRepuestosCsv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRepuestosCsv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRepuestosCsv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
