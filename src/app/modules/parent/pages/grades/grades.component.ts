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
  schoolYears: any = [];
  terms: any = [];

  term = '';
  schoolYear = '';

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
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        const uniqueSchoolYears = this.getUniqueObjects(data);
        const uniqueTerms = this.getUniqueObjects1(data);
        this.schoolYears = [];
        uniqueSchoolYears.map((grade: any) => {
          this.schoolYears.push(grade.student.academicYear);
        });
        this.terms = [];
        uniqueTerms.map((grade: any) => {
          this.terms.push(grade.student.sem);
        });
      });
  };

  isObjectUnique = (obj1: any, obj2: any) => {
    return obj1.student.academicYear === obj2.student.academicYear;
  };

  getUniqueObjects = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  isObjectUnique1 = (obj1: any, obj2: any) => {
    return obj1.student.sem === obj2.student.sem;
  };

  getUniqueObjects1 = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  getAverage = (prelim: any, midterm: any, final: any) => {
    let sum = 0;
    let period = 1;
    if (prelim != null) {
      sum += parseFloat(prelim);
    }
    if (midterm != null) {
      period = 2;
      sum += parseFloat(midterm);
    }
    if (final != null) {
      period = 3;
      sum += parseFloat(final);
    }
    const avg = sum / period;
    return avg != 0 ? parseFloat(avg.toFixed(2)) : '-';
  };

  onChangeSchoolYear = (schoolYear: string) => {
    this.gradeService
      .getGradeByStudentId(this.student.studentId)
      .subscribe((data) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        const uniqueSchoolYears = this.getUniqueObjects(data);
        const uniqueTerms = this.getUniqueObjects1(data);
        this.schoolYears = [];
        uniqueSchoolYears.map((grade: any) => {
          this.schoolYears.push(grade.student.academicYear);
        });
        this.terms = [];
        uniqueTerms.map((grade: any) => {
          this.terms.push(grade.student.sem);
        });
        if (this.term != '') {
          this.grades = this.grades.filter(
            (grade: any) =>
              grade.student.academicYear == schoolYear &&
              grade.student.sem == this.term
          );
        } else {
          this.grades = this.grades.filter(
            (grade: any) => grade.student.academicYear == schoolYear
          );
        }
      });
  };

  onChangeTerm = (term: string) => {
    this.gradeService
      .getGradeByStudentId(this.student.studentId)
      .subscribe((data) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        const uniqueSchoolYears = this.getUniqueObjects(data);
        const uniqueTerms = this.getUniqueObjects1(data);
        this.schoolYears = [];
        uniqueSchoolYears.map((grade: any) => {
          this.schoolYears.push(grade.student.academicYear);
        });
        this.terms = [];
        uniqueTerms.map((grade: any) => {
          this.terms.push(grade.student.sem);
        });
        if (this.schoolYear != '') {
          this.grades = this.grades.filter(
            (grade: any) =>
              grade.student.academicYear == this.schoolYear &&
              grade.student.sem == term
          );
        } else {
          this.grades = this.grades.filter(
            (grade: any) => grade.student.sem == term
          );
        }
      });
  };

  onReset = () => {
    this.term = '';
    this.schoolYear = '';
    this.getStudentId();
  };
}
