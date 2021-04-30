import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContentCreatorsComponent } from './admin-content-creators.component';

describe('AdminContentCreatorsComponent', () => {
  let component: AdminContentCreatorsComponent;
  let fixture: ComponentFixture<AdminContentCreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContentCreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContentCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
