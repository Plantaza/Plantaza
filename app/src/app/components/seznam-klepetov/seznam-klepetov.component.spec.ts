import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeznamKlepetovComponent } from './seznam-klepetov.component';

describe('SeznamKlepetovComponent', () => {
  let component: SeznamKlepetovComponent;
  let fixture: ComponentFixture<SeznamKlepetovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeznamKlepetovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeznamKlepetovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
