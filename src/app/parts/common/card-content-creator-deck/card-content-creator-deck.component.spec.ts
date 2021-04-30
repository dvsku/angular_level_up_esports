import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentCreatorDeckComponent } from './card-content-creator-deck.component';

describe('CardContentCreatorDeckComponent', () => {
  let component: CardContentCreatorDeckComponent;
  let fixture: ComponentFixture<CardContentCreatorDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardContentCreatorDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContentCreatorDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
