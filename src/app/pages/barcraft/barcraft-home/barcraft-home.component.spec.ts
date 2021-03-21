import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcraftHomeComponent } from './barcraft-home.component';

describe('BarcraftHomeComponent', () => {
  let component: BarcraftHomeComponent;
  let fixture: ComponentFixture<BarcraftHomeComponent>;

  beforeEach(async(() => {
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
