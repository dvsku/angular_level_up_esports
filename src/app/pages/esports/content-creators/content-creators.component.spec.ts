import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatorsComponent } from './content-creators.component';

describe('ContentCreatorsComponent', () => {
  let component: ContentCreatorsComponent;
  let fixture: ComponentFixture<ContentCreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
