import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVariables } from './modal-variables';

describe('ModalVariables', () => {
  let component: ModalVariables;
  let fixture: ComponentFixture<ModalVariables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVariables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVariables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
