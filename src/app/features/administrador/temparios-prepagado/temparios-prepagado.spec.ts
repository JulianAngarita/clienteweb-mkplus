import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempariosPrepagado } from './temparios-prepagado';

describe('TempariosPrepagado', () => {
  let component: TempariosPrepagado;
  let fixture: ComponentFixture<TempariosPrepagado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempariosPrepagado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempariosPrepagado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
