import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberGroupComponent } from './team-member-group.component';

describe('TeamMemberGroupComponent', () => {
  let component: TeamMemberGroupComponent;
  let fixture: ComponentFixture<TeamMemberGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
