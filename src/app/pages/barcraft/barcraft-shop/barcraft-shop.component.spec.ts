import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarcraftShopComponent } from './barcraft-shop.component';

describe('BarcraftShopComponent', () => {
  let component: BarcraftShopComponent;
  let fixture: ComponentFixture<BarcraftShopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcraftShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcraftShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
