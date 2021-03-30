import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFormGroupComponent } from './images-form-group.component';

describe('ImagesFormGroupComponent', () => {
  let component: ImagesFormGroupComponent;
  let fixture: ComponentFixture<ImagesFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesFormGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
