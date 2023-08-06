import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
  providers: [DatePipe],
})
export class StudentAttendanceComponent implements OnInit {
  attendance: any = [];
  subjects: any = [];
  atts = ['Present', 'Absent', 'Late'];

  id: any;
  subjectId: any;
  date: any;

  gradeSearch = '';
  att1 = '';
  subject = '';

  present = 0;
  absent = 0;
  late = 0;

  constructor(
    private attendanceStudentService: AttendanceStudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getParam();
    this.getAttendance();
  }

  getParam = () => {
    const params = this.route.snapshot.params['id'];
    const splitParams = params.split('-');
    this.id = splitParams[0];
    this.subjectId = splitParams[1];
  };

  getAttendance = () => {
    this.attendanceStudentService
      .getAttendanceByStudentId(this.id)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.subjects = [];
        const unique = this.getUniqueObjects(data);
        unique.forEach((att: any) => {
          this.subjects.push(att.subject.subjectTitle);
        });
        this.subject = unique[unique.length - 1];
        this.attendance = this.attendance.filter(
          (att: any) => att.subject.subjectTitle == this.subject
        );
        const present = this.attendance.filter(
          (att: any) =>
            att.status == 'Present' && att.subject.subjectTitle == this.subject
        );
        this.present = present.length;
        const absent = this.attendance.filter(
          (att: any) =>
            att.status == 'Absent' && att.subject.subjectTitle == this.subject
        );
        this.absent = absent.length;
        const late = this.attendance.filter(
          (att: any) =>
            att.status == 'Late' && att.subject.subjectTitle == this.subject
        );
        this.late = late.length;
      });
  };

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

  onChangeAttendance = (status: string) => {
    if (this.subject != '') {
      this.attendanceStudentService
        .getAttendanceByStudentId(this.id)
        .subscribe((data: any) => {
          this.attendance = data.sort(
            (a: any, b: any) => b.attendanceId - a.attendanceId
          );
          const present = this.attendance.filter(
            (att: any) =>
              att.status == 'Present' &&
              att.subject.subjectTitle == this.subject
          );
          this.present = present.length;
          const absent = this.attendance.filter(
            (att: any) =>
              att.status == 'Absent' && att.subject.subjectTitle == this.subject
          );
          this.absent = absent.length;
          const late = this.attendance.filter(
            (att: any) =>
              att.status == 'Late' && att.subject.subjectTitle == this.subject
          );
          this.late = late.length;
          this.attendance = this.attendance.filter(
            (att: any) =>
              att.status == status && att.subject.subjectTitle == this.subject
          );
        });
    } else {
      this.attendanceStudentService
        .getAttendanceByStudentId(this.id)
        .subscribe((data: any) => {
          this.attendance = data.sort(
            (a: any, b: any) => b.attendanceId - a.attendanceId
          );
          this.attendance = this.attendance.filter(
            (att: any) => att.status == status
          );
        });
    }
  };

  onChangeSubject = (subject: string) => {
    if (this.att1 != '') {
      this.attendanceStudentService
        .getAttendanceByStudentId(this.id)
        .subscribe((data: any) => {
          this.attendance = data.sort(
            (a: any, b: any) => b.attendanceId - a.attendanceId
          );
          this.attendance = this.attendance.filter(
            (att: any) =>
              att.subject.subjectTitle == subject && att.status == this.att1
          );
        });
    } else {
      this.attendanceStudentService
        .getAttendanceByStudentId(this.id)
        .subscribe((data: any) => {
          this.attendance = data.sort(
            (a: any, b: any) => b.attendanceId - a.attendanceId
          );
          const present = this.attendance.filter(
            (att: any) =>
              att.status == 'Present' &&
              att.subject.subjectTitle == this.subject
          );
          this.present = present.length;
          const absent = this.attendance.filter(
            (att: any) =>
              att.status == 'Absent' && att.subject.subjectTitle == this.subject
          );
          this.absent = absent.length;
          const late = this.attendance.filter(
            (att: any) =>
              att.status == 'Late' && att.subject.subjectTitle == this.subject
          );
          this.late = late.length;
          this.attendance = this.attendance.filter(
            (att: any) => att.subject.subjectTitle == subject
          );
        });
    }
  };

  onReset = () => {
    this.gradeSearch = '';
    this.att1 = '';
    this.subject = '';
    this.getAttendance();
  };

  onBack = () => {
    history.back();
  };
}
