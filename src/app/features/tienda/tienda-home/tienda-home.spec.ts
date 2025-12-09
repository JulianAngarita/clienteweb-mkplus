import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaHome } from './tienda-home';

describe('TiendaHome', () => {
  let component: TiendaHome;
  let fixture: ComponentFixture<TiendaHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
