import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentCreatorComponent } from './card-content-creator.component';

describe('CardContentCreatorComponent', () => {
  let component: CardContentCreatorComponent;
  let fixture: ComponentFixture<CardContentCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardContentCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
