import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent implements OnInit {
  student: any = {};
  grades: any = [];
  ngOnInit(): void {
    this.getStudentId();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private gradeService: GradeService
  ) {}

  getStudentId = () => {
    const parentId = this.authService.getUserId();
    this.studentService
      .getStudentByParentId(parentId)
      .subscribe((data: any) => {
        this.student = data;
        this.getGrades();
      });
  };

  getGrades = () => {
    this.gradeService
      .getGradeByStudentId(this.student.studentId)
      .subscribe((data) => {
        this.grades = data;
      });
  };
}
