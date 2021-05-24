import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlepetComponent } from './klepet.component';

describe('KlepetComponent', () => {
  let component: KlepetComponent;
  let fixture: ComponentFixture<KlepetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlepetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlepetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
