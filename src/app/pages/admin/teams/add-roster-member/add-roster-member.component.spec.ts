import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRosterMemberComponent } from './add-roster-member.component';

describe('AddRosterMemberComponent', () => {
  let component: AddRosterMemberComponent;
  let fixture: ComponentFixture<AddRosterMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRosterMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRosterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
