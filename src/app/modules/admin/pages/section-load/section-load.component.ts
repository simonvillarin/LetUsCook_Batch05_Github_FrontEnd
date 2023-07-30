import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { Paginator } from 'primeng/paginator';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvalService } from 'src/app/shared/services/eval/eval.service';

@Component({
  selector: 'app-load',
  templateUrl: './section-load.component.html',
  styleUrls: ['./section-load.component.scss'],
})
export class SectionLoadComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined;

  gradesForm: FormGroup;
  attendanceForm: FormGroup;

  sectionId: any;
  subjectId: any;
  grades: any = [];
  attendance: any = [];
  evaluations: any = [];
  subjectsAttendance: any = [];
  subjectsGrades: any = [];
  student: any = {};
  grade: any = {};
  att: any = {};
  remark: any;
  remarks = ['Passed', 'Failed'];
  atts = ['Present', 'Absent', 'Late'];

  gradesDialog: boolean = false;
  attDialog: boolean = false;

  gradeSearch = '';
  attSearch = '';
  att1 = '';
  subjectAttendance = '';
  subjectGrade = '';
  date: any;

  constructor(
    private gradeService: GradeService,
    private attendanceStudentService: AttendanceStudentService,
    private evalService: EvalService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.gradesForm = fb.group({
      prelim: [''],
      midterm: [''],
      finals: [''],
      comment: [''],
      remarks: [''],
    });
    this.attendanceForm = fb.group({
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getParam();
    this.getGrades();
    this.getAttendance();
    //  this.getEvaluations();
  }

  getParam = () => {
    const params = this.route.snapshot.params['section'];
    const splitParams = params.split('-');
    this.sectionId = splitParams[0];
  };

  getGrades = () => {
    this.gradeService.getGradesBySec(this.sectionId).subscribe((data: any) => {
      this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
      const uniqueObj = this.getUniqueObjects(data);
      const sortObj = uniqueObj.sort((a: any, b: any) => b.gradeId - a.gradeId);
      this.subjectsGrades = [];
      sortObj.map((obj: any) => {
        this.subjectsGrades.push(obj.subject.subjectTitle);
      });
      this.subjectGrade = this.subjectsGrades[0];
      if (this.subjectGrade != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.remarks == this.remark &&
            grade.subject.subjectTitle == this.subjectGrade
        );
      } else {
        this.grades = this.grades.filter(
          (grade: any) => grade.remarks == this.remark
        );
      }
    });
  };

  getAttendance = () => {
    this.attendanceStudentService
      .getAttendanceBySec(this.sectionId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        const uniqueObj = this.getUniqueObjects(data);
        const sortObj = uniqueObj.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.subjectsAttendance = [];
        sortObj.map((obj: any) => {
          this.subjectsAttendance.push(obj.subject.subjectTitle);
        });
        this.subjectAttendance = this.subjectsAttendance[0];
        this.attendance = this.attendance.filter(
          (att: any) => att.subject.subjectTitle == this.subjectAttendance
        );
      });
  };

  // getEvaluations = () => {
  //   this.evalService
  //     .getEvalBySubjectId(this.subjectId)
  //     .subscribe((data: any) => {
  //       this.evaluations = data.sort((a: any, b: any) => b.evalonId - a.evalId);
  //     });
  // };

  isObjectUnique = (obj1: any, obj2: any) => {
    return obj1.subject.subjectId === obj2.subject.subjectId;
  };

  getUniqueObjects = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '-';
  };

  convertDate1 = () => {
    const date = new Date();
    if (date.getFullYear() > 2022) {
      this.date = this.datePipe.transform(date, 'yyyy-MM-dd');
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '-';
  };

  convertDate2 = () => {
    const date = new Date();
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    return '-';
  };

  onChangeGradeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      if (this.remark != null && this.subjectGrade != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.student.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.middlename
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.lastname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            ((
              grade.student.firstname.toLowerCase() +
              ' ' +
              grade.student.middlename.toLowerCase() +
              '' +
              grade.student.lastname.toLowerCase()
            ).includes(searchTerm.toLowerCase()) &&
              grade.remarks == this.remark &&
              grade.subject.subjectTitle == this.subjectGrade)
        );
      } else if (this.remark != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.student.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.middlename
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.lastname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            ((
              grade.student.firstname.toLowerCase() +
              ' ' +
              grade.student.middlename.toLowerCase() +
              '' +
              grade.student.lastname.toLowerCase()
            ).includes(searchTerm.toLowerCase()) &&
              grade.remarks == this.remark)
        );
      } else if (this.subjectGrade != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.student.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.middlename
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.lastname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            ((
              grade.student.firstname.toLowerCase() +
              ' ' +
              grade.student.middlename.toLowerCase() +
              '' +
              grade.student.lastname.toLowerCase()
            ).includes(searchTerm.toLowerCase()) &&
              grade.subject.subjectTitle == this.subjectGrade)
        );
      } else {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.student.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.middlename
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            grade.student.lastname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (
              grade.student.firstname.toLowerCase() +
              ' ' +
              grade.student.middlename.toLowerCase() +
              '' +
              grade.student.lastname.toLowerCase()
            ).includes(searchTerm.toLowerCase())
        );
      }

      this.attendance = this.attendance.filter(
        (grade: any) =>
          grade.student.firstname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          grade.student.middlename
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          grade.student.lastname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ((
            grade.student.firstname.toLowerCase() +
            ' ' +
            grade.student.middlename.toLowerCase() +
            '' +
            grade.student.lastname.toLowerCase()
          ).includes(searchTerm.toLowerCase()) &&
            grade.subject.subjectTitle == this.subjectAttendance)
      );

      this.evaluations = this.evaluations.filter(
        (grade: any) =>
          grade.student.firstname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          grade.student.middlename
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          grade.student.lastname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (
            grade.student.firstname.toLowerCase() +
            ' ' +
            grade.student.middlename.toLowerCase() +
            '' +
            grade.student.lastname.toLowerCase()
          ).includes(searchTerm.toLowerCase())
      );
    } else {
      this.getGrades();
      this.getAttendance();
      // this.getEvaluations();
    }
  };

  onChangeRemarks = (remarks: string) => {
    this.gradeService.getGradesBySec(this.sectionId).subscribe((data: any) => {
      this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
      if (this.subjectGrade != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.remarks == remarks &&
            grade.subject.subjectTitle == this.subjectGrade
        );
      } else {
        this.grades = this.grades.filter(
          (grade: any) => grade.remarks == remarks
        );
      }
    });
  };

  onChangeAttendance = (status: string) => {
    this.attendanceStudentService
      .getAttendanceBySec(this.sectionId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.attendance = this.attendance.filter(
          (att: any) => att.status == status
        );
      });
  };

  onChangeSubjectAttendance = (subject: string) => {
    this.attendanceStudentService
      .getAttendanceBySec(this.sectionId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.attendance = this.attendance.filter(
          (att: any) => att.subject.subjectTitle == subject
        );
      });
  };

  onChangeSubjectGrades = (subject: string) => {
    this.gradeService.getGradesBySec(this.sectionId).subscribe((data: any) => {
      this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
      if (this.remark != null) {
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.subject.subjectTitle == subject &&
            grade.remarks == this.remark
        );
      } else {
        this.grades = this.grades.filter(
          (grade: any) => grade.subject.subjectTitle == subject
        );
      }
    });
  };

  onReset = () => {
    this.gradeSearch = '';
    this.att1 = '';
    this.remark = '';
    this.getGrades();
    this.getAttendance();
    this.evaluations();
  };

  onAttendance = (att: any) => {
    this.router.navigate([
      `admin/section/attendance/${att.student.studentId}-${att.subject.subjectId}`,
    ]);
  };

  onEval = (evaluation: any) => {
    // this.router.navigate([
    //   `professor/course/evaluation/${evaluation.student.studentId}-${this.subjectId}`,
    // ]);
  };
}
