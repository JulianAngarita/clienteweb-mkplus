import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTerminosCondiciones } from './modal-terminos-condiciones';

describe('ModalTerminosCondiciones', () => {
  let component: ModalTerminosCondiciones;
  let fixture: ComponentFixture<ModalTerminosCondiciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTerminosCondiciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTerminosCondiciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
