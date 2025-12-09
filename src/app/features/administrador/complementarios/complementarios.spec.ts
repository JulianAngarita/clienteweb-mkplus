import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Complementarios } from './complementarios';

describe('Complementarios', () => {
  let component: Complementarios;
  let fixture: ComponentFixture<Complementarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Complementarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Complementarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
