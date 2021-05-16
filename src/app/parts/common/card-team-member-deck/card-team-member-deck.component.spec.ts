import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeamMemberDeckComponent } from './card-team-member-deck.component';

describe('CardTeamMemberDeckComponent', () => {
  let component: CardTeamMemberDeckComponent;
  let fixture: ComponentFixture<CardTeamMemberDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTeamMemberDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTeamMemberDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
