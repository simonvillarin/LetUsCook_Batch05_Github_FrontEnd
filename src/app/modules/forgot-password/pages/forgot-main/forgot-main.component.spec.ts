import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMainComponent } from './forgot-main.component';

describe('ForgotMainComponent', () => {
  let component: ForgotMainComponent;
  let fixture: ComponentFixture<ForgotMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotMainComponent]
    });
    fixture = TestBed.createComponent(ForgotMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
