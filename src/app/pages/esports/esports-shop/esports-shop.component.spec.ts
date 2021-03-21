import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsShopComponent } from './esports-shop.component';

describe('EsportsShopComponent', () => {
  let component: EsportsShopComponent;
  let fixture: ComponentFixture<EsportsShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsportsShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsportsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
