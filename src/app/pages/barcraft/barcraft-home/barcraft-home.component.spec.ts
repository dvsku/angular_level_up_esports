import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarcraftHomeComponent } from './barcraft-home.component';

describe('BarcraftHomeComponent', () => {
  let component: BarcraftHomeComponent;
  let fixture: ComponentFixture<BarcraftHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcraftHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcraftHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
