import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVersiones } from './modal-versiones';

describe('ModalVersiones', () => {
  let component: ModalVersiones;
  let fixture: ComponentFixture<ModalVersiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVersiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVersiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
