import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShranjenoComponent } from './shranjeno.component';

describe('ShranjenoComponent', () => {
  let component: ShranjenoComponent;
  let fixture: ComponentFixture<ShranjenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShranjenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShranjenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
