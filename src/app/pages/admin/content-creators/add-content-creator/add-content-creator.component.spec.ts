import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentCreatorComponent } from './add-content-creator.component';

describe('AddContentCreatorComponent', () => {
  let component: AddContentCreatorComponent;
  let fixture: ComponentFixture<AddContentCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContentCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
