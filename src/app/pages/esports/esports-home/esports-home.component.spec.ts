import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsHomeComponent } from './esports-home.component';

describe('EsportsHomeComponent', () => {
  let component: EsportsHomeComponent;
  let fixture: ComponentFixture<EsportsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsportsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsportsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
