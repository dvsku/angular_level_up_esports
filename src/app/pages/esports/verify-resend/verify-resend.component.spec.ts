import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyResendComponent } from './verify-resend.component';

describe('VerifyResendComponent', () => {
  let component: VerifyResendComponent;
  let fixture: ComponentFixture<VerifyResendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyResendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
