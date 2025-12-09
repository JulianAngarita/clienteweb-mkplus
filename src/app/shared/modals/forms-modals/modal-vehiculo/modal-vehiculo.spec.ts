import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVehiculo } from './modal-vehiculo';

describe('ModalVehiculo', () => {
  let component: ModalVehiculo;
  let fixture: ComponentFixture<ModalVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
