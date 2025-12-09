import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Versiones } from './versiones';

describe('Versiones', () => {
  let component: Versiones;
  let fixture: ComponentFixture<Versiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Versiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Versiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
