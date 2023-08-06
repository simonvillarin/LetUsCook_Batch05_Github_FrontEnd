import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeComponent } from './student-grade.component';

describe('StudentGradeComponent', () => {
  let component: StudentGradeComponent;
  let fixture: ComponentFixture<StudentGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentGradeComponent]
    });
    fixture = TestBed.createComponent(StudentGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
