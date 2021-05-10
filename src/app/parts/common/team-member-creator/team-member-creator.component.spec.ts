import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberCreatorComponent } from './team-member-creator.component';

describe('TeamMemberCreatorComponent', () => {
  let component: TeamMemberCreatorComponent;
  let fixture: ComponentFixture<TeamMemberCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
