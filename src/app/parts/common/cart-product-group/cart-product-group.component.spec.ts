import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductGroupComponent } from './cart-product-group.component';

describe('CartProductGroupComponent', () => {
  let component: CartProductGroupComponent;
  let fixture: ComponentFixture<CartProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
