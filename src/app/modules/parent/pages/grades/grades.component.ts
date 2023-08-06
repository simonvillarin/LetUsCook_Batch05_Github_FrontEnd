import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent implements OnInit {
  students: any = [];
  grades: any = [];

  ngOnInit(): void {
    this.getStudentId();
  }

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  getStudentId = () => {
    const parentId = this.authService.getUserId();
    this.studentService
      .getStudentByParentId(parentId)
      .subscribe((data: any) => {
        this.students = data;
      });
  };

  view = (studentId: number) => {
    this.router.navigate([`/parent/grades/${studentId}`]);
  };
}
