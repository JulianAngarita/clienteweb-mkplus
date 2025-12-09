import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionModelos } from './presentacion-modelos';

describe('PresentacionModelos', () => {
  let component: PresentacionModelos;
  let fixture: ComponentFixture<PresentacionModelos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentacionModelos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentacionModelos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
