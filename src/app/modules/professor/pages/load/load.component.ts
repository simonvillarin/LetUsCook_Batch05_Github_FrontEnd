import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { Paginator } from 'primeng/paginator';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  grades: any = [];
  attendance: any = [];
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

  constructor(
    private gradeService: GradeService,
    private attendanceStudentService: AttendanceStudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
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
  }

  getParam = () => {
    const params = this.route.snapshot.params['section'];
    const splitParams = params.split('-');
    this.sectionId = splitParams[0];
    this.subjectId = splitParams[1];
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
        console.log(this.attendance);
      });
  };

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour;
    let zone;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 14) {
      hour = 2;
    } else if (parseInt(splitTime[0]) == 15) {
      hour = 3;
    } else if (parseInt(splitTime[0]) == 16) {
      hour = 4;
    } else if (parseInt(splitTime[0]) == 17) {
      hour = 5;
    } else if (parseInt(splitTime[0]) == 18) {
      hour = 6;
    } else if (parseInt(splitTime[0]) == 19) {
      hour = 7;
    } else if (parseInt(splitTime[0]) == 20) {
      hour = 8;
    } else if (parseInt(splitTime[0]) == 21) {
      hour = 9;
    } else if (parseInt(splitTime[0]) == 22) {
      hour = 10;
    } else if (parseInt(splitTime[0]) == 23) {
      hour = 11;
    } else if (parseInt(splitTime[0]) == 24 || splitTime[0] == '00') {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      zone = 'PM';
    } else {
      zone = 'AM';
    }
    return hour + ':' + splitTime[1] + ' ' + zone;
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '-';
  };

  onChangeGradeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
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
    } else {
      this.getGrades();
      this.getAttendance();
    }
  };

  onChangeRemarks = (remarks: string) => {
    this.gradeService
      .getGradesBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        this.grades = this.grades.filter(
          (grade: any) => grade.remarks == remarks
        );
      });
  };

  onReset = () => {
    this.gradeSearch = '';
    this.getGrades();
    this.getAttendance();
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
    this.gradesDialog = true;
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
      sum += parseInt(prelim);
    }
    if (midterm != 0) {
      period = 2;
      sum += parseInt(midterm);
    }
    if (final != 0) {
      period = 3;
      sum += parseInt(final);
    }
    const avg = sum / period;

    let remarks;
    if (avg < 75) {
      remarks = 'Failed';
    } else if (avg > 75) {
      remarks = 'Passed';
    }

    const payload = {
      prelim: prelim != 0 ? prelim : '',
      midterm: midterm != 0 ? midterm : '',
      finals: final != 0 ? final : '',
      remarks: remarks,
    };

    this.gradeService.updateGrade(this.grade.gradeId, payload).subscribe(() => {
      this.getGrades();
      this.gradesDialog = false;
    });
  };

  onSubmitAttendance = () => {
    this.attendanceStudentService
      .updateAttendance(this.att.attendanceId, this.attendanceForm.value)
      .subscribe(() => {
        this.getAttendance();
        this.attDialog = false;
      });
  };
}
