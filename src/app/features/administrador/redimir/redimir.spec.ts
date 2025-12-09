import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redimir } from './redimir';

describe('Redimir', () => {
  let component: Redimir;
  let fixture: ComponentFixture<Redimir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Redimir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Redimir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
