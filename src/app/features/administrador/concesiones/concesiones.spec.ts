import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concesiones } from './concesiones';

describe('Concesiones', () => {
  let component: Concesiones;
  let fixture: ComponentFixture<Concesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Concesiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
