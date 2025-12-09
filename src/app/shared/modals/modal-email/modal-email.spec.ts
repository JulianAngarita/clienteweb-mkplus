import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmail } from './modal-email';

describe('ModalEmail', () => {
  let component: ModalEmail;
  let fixture: ComponentFixture<ModalEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
