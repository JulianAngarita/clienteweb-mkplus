import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorHome } from './administrador-home';

describe('AdministradorHome', () => {
  let component: AdministradorHome;
  let fixture: ComponentFixture<AdministradorHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
