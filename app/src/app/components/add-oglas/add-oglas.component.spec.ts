import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOglasComponent } from './add-oglas.component';

describe('AddOglasComponent', () => {
  let component: AddOglasComponent;
  let fixture: ComponentFixture<AddOglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOglasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
