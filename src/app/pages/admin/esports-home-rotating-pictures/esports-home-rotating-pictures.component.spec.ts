import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsHomeRotatingPicturesComponent } from './esports-home-rotating-pictures.component';

describe('EsportsHomeRotatingPicturesComponent', () => {
  let component: EsportsHomeRotatingPicturesComponent;
  let fixture: ComponentFixture<EsportsHomeRotatingPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsportsHomeRotatingPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsportsHomeRotatingPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
