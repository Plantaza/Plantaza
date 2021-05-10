import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrodjeBackComponent } from './ogrodje-back.component';

describe('OgrodjeBackComponent', () => {
  let component: OgrodjeBackComponent;
  let fixture: ComponentFixture<OgrodjeBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgrodjeBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrodjeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
