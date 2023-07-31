import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { Paginator } from 'primeng/paginator';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvalService } from 'src/app/shared/services/eval/eval.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined;

  gradesForm: FormGroup;
  attendanceForm: FormGroup;

  sectionId: any;
  subjectId: any;
  schedule: any;
  grades: any = [];
  attendance: any = [];
  evaluations: any = [];
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
  date: any;
  days: any = [];

  canEditAttendance: boolean = false;
  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  constructor(
    private gradeService: GradeService,
    private attendanceStudentService: AttendanceStudentService,
    private evalService: EvalService,
    private authService: AuthService,
    private scheduleService: ScheduleService,
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
    this.getEvaluations();
    this.getSchedule();
  }

  getParam = () => {
    const params = this.route.snapshot.params['section'];
    const splitParams = params.split('-');
    this.sectionId = splitParams[0];
    this.subjectId = splitParams[1];
  };

  getSchedule = () => {
    const profId = this.authService.getUserId();
    this.scheduleService.getScheduleById(profId).subscribe((data: any) => {
      this.schedule = data;
      this.schedule = this.schedule.filter(
        (sched: any) => sched.subject.subjectId == this.subjectId
      );
      this.schedule.map((sub: any) => this.days.push(sub.days));
      let today = new Date();
      const day: any = this.datePipe.transform(today, 'EEEE');
      this.canEditAttendance = this.days[0].includes(day);
    });
  };

  getGrades = () => {
    this.gradeService
      .getGradesBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
      });
  };

  getAttendance = () => {
    this.attendanceStudentService
      .getAttendanceBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
      });
  };

  getEvaluations = () => {
    this.evalService
      .getEvalBySubjectId(this.subjectId)
      .subscribe((data: any) => {
        this.evaluations = data.sort((a: any, b: any) => b.evalonId - a.evalId);
      });
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '';
  };

  convertDate1 = () => {
    const date = new Date();
    if (date.getFullYear() > 2022) {
      this.date = this.datePipe.transform(date, 'yyyy-MM-dd');
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '';
  };

  convertDate2 = () => {
    const date = new Date();
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    return '';
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

  onChangeGradeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      if (this.remark != '') {
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

      if (this.att1 != '') {
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
              grade.status == this.att1)
        );
      } else {
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
            (
              grade.student.firstname.toLowerCase() +
              ' ' +
              grade.student.middlename.toLowerCase() +
              '' +
              grade.student.lastname.toLowerCase()
            ).includes(searchTerm.toLowerCase())
        );
      }

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
      if (this.remark != '') {
        this.grades = this.grades.filter(
          (grade: any) => grade.remarks == this.remark
        );
      } else {
        this.getGrades();
      }
      if (this.att1 != '') {
        this.attendance = this.attendance.filter(
          (att: any) => att.status == this.att1
        );
      } else {
        this.getAttendance();
      }

      this.getEvaluations();
    }
  };

  onChangeRemarks = (remarks: string) => {
    this.gradeService
      .getGradesBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        if (this.gradeSearch != '') {
          this.grades = this.grades.filter(
            (grade: any) =>
              (grade.remarks == remarks &&
                grade.student.firstname
                  .toLowerCase()
                  .includes(this.gradeSearch.toLowerCase())) ||
              grade.student.middlename
                .toLowerCase()
                .includes(this.gradeSearch.toLowerCase()) ||
              grade.student.lastname
                .toLowerCase()
                .includes(this.gradeSearch.toLowerCase()) ||
              (
                grade.student.firstname.toLowerCase() +
                ' ' +
                grade.student.middlename.toLowerCase() +
                '' +
                grade.student.lastname.toLowerCase()
              ).includes(this.gradeSearch.toLowerCase())
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
      .getAttendanceBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        if (this.gradeSearch != '') {
          this.attendance = this.attendance.filter(
            (grade: any) =>
              grade.student.firstname
                .toLowerCase()
                .includes(this.gradeSearch.toLowerCase()) ||
              grade.student.middlename
                .toLowerCase()
                .includes(this.gradeSearch.toLowerCase()) ||
              grade.student.lastname
                .toLowerCase()
                .includes(this.gradeSearch.toLowerCase()) ||
              ((
                grade.student.firstname.toLowerCase() +
                ' ' +
                grade.student.middlename.toLowerCase() +
                '' +
                grade.student.lastname.toLowerCase()
              ).includes(this.gradeSearch.toLowerCase()) &&
                grade.status == this.att1)
          );
        } else {
          this.attendance = this.attendance.filter(
            (att: any) => att.status == status
          );
        }
      });
  };

  onReset = () => {
    this.gradeSearch = '';
    this.att1 = '';
    this.getGrades();
    this.getAttendance();
    this.evaluations();
  };

  onEdit = (grade: any) => {
    this.grade = grade;
    this.student = grade.student;
    this.gradesForm.patchValue({
      prelim: grade.prelim,
      midterm: grade.midterm,
      finals: grade.finals,
      comment: grade.comment,
    });
    this.alert = false;
    this.gradesDialog = true;
  };

  onCancelGrade = () => {
    this.gradesDialog = false;
  };

  onCancel = () => {
    this.attDialog = false;
  };

  onEditAtt = (att: any) => {
    this.att = att;
    this.student = att.student;
    this.attDialog = true;
  };

  onSubmit = () => {
    const prelim = this.gradesForm.get('prelim')?.value || 0;
    const midterm = this.gradesForm.get('midterm')?.value || 0;
    const final = this.gradesForm.get('finals')?.value || 0;
    let period = 1;
    let sum = 0;
    if (prelim != 0) {
      sum += parseFloat(prelim);
    }
    if (midterm != 0) {
      period = 2;
      sum += parseFloat(midterm);
    }
    if (final != 0) {
      period = 3;
      sum += parseFloat(final);
    }
    const avg = sum / period;

    let remarks;
    if (avg < 75) {
      remarks = 'Failed';
    } else if (avg >= 75) {
      remarks = 'Passed';
    }

    const payload = {
      prelim: prelim != 0 ? prelim : '',
      midterm: midterm != 0 ? midterm : '',
      finals: final != 0 ? final : '',
      remarks: avg != 0 ? remarks : '',
      comment: this.gradesForm.get('comment')?.value,
    };

    if (midterm != 0 && prelim == 0) {
      this.alert = true;
      this.alertMessage = 'Please add grade in prelim period first';
      this.alertStatus = 'Error';
      setTimeout(() => (this.alert = false), 3000);
    } else if (final != 0 && prelim == 0) {
      this.alert = true;
      this.alertMessage = 'Please add grade in prelim period first';
      this.alertStatus = 'Error';
      setTimeout(() => (this.alert = false), 3000);
    } else if (final != 0 && midterm == 0) {
      this.alert = true;
      this.alertMessage = 'Please add grade in midterm period first';
      this.alertStatus = 'Error';
      setTimeout(() => (this.alert = false), 3000);
    } else if (final != 0 && prelim == 0 && midterm == 0) {
      this.alert = true;
      this.alertMessage = 'Please add grade in prelim and midterm period first';
      this.alertStatus = 'Error';
      setTimeout(() => (this.alert = false), 3000);
    } else {
      this.gradeService
        .updateGrade(this.grade.gradeId, payload)
        .subscribe(() => {
          this.getGrades();
          this.alert = true;
          this.alertMessage = "Student's grade successully updated";
          this.alertStatus = 'Success';
          setTimeout(() => (this.alert = false), 3000);
          this.gradesDialog = false;
        });
    }
  };

  onSubmitAttendance = () => {
    const payload = {
      date: this.date,
      status: this.attendanceForm.get('status')?.value,
    };
    this.attendanceStudentService
      .updateAttendance(this.att.attendanceId, payload)
      .subscribe(() => {
        this.getAttendance();
        this.attDialog = false;
      });
  };

  onAttendance = (att: any) => {
    this.router.navigate([
      `professor/course/attendance/${att.student.studentId}-${this.subjectId}`,
    ]);
  };

  onEval = (evaluation: any) => {
    this.router.navigate([
      `professor/course/evaluation/${evaluation.student.studentId}-${this.subjectId}`,
    ]);
  };
}
