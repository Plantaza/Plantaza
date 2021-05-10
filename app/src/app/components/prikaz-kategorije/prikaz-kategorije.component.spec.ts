import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazKategorijeComponent } from './prikaz-kategorije.component';

describe('PrikazKategorijeComponent', () => {
  let component: PrikazKategorijeComponent;
  let fixture: ComponentFixture<PrikazKategorijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazKategorijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazKategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
