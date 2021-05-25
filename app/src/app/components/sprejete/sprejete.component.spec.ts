import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprejeteComponent } from './sprejete.component';

describe('SprejeteComponent', () => {
  let component: SprejeteComponent;
  let fixture: ComponentFixture<SprejeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprejeteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprejeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
