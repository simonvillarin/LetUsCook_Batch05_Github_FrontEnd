import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationFormDialogComponent } from './evaluation-form-dialog.component';

describe('EvaluationFormDialogComponent', () => {
  let component: EvaluationFormDialogComponent;
  let fixture: ComponentFixture<EvaluationFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationFormDialogComponent]
    });
    fixture = TestBed.createComponent(EvaluationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
