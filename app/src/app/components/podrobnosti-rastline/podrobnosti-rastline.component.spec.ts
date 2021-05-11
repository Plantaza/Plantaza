import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodrobnostiRastlineComponent } from './podrobnosti-rastline.component';

describe('PodrobnostiRastlineComponent', () => {
  let component: PodrobnostiRastlineComponent;
  let fixture: ComponentFixture<PodrobnostiRastlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodrobnostiRastlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodrobnostiRastlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
