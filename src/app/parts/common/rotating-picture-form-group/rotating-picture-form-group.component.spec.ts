import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingPictureFormGroupComponent } from './rotating-picture-form-group.component';

describe('RotatingPictureFormGroupComponent', () => {
  let component: RotatingPictureFormGroupComponent;
  let fixture: ComponentFixture<RotatingPictureFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotatingPictureFormGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotatingPictureFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
