import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoKia } from './logo-kia';

describe('LogoKia', () => {
  let component: LogoKia;
  let fixture: ComponentFixture<LogoKia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoKia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoKia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
