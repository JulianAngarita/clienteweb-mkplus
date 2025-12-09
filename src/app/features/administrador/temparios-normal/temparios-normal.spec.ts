import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempariosNormal } from './temparios-normal';

describe('TempariosNormal', () => {
  let component: TempariosNormal;
  let fixture: ComponentFixture<TempariosNormal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempariosNormal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempariosNormal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
