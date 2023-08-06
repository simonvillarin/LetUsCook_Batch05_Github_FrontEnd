import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  attendance: any = [];
  att: any;
  atts = ['Present', 'Absent', 'Late'];

  id: any;
  subjectId: any;
  date: any;

  gradeSearch = '';
  att1 = '';

  present = 0;
  absent = 0;
  late = 0;

  attDialog: boolean = false;

  constructor(
    private attendanceStudentService: AttendanceStudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.attendanceForm = fb.group({
      status: [''],
    });
  }

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
      .getAttendanceById(this.id, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        const present = this.attendance.filter(
          (att: any) => att.status == 'Present'
        );
        this.present = present.length;
        const absent = this.attendance.filter(
          (att: any) => att.status == 'Absent'
        );
        this.absent = absent.length;
        const late = this.attendance.filter((att: any) => att.status == 'Late');
        this.late = late.length;
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
    this.attendanceStudentService
      .getAttendanceById(this.id, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.attendance = this.attendance.filter(
          (att: any) => att.status == status
        );
      });
  };

  onReset = () => {
    this.gradeSearch = '';
    this.att1 = '';
    this.getAttendance();
  };

  onChangeGradeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
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
      this.getAttendance();
    }
  };

  onBack = () => {
    history.back();
  };

  onCancel = () => {
    this.attDialog = false;
  };

  onEditAtt = (attendance: any) => {
    console.log(attendance);
    this.att = attendance;
    this.attDialog = true;
  };

  onSubmitAttendance = () => {
    const payload = {
      status: this.attendanceForm.get('status')?.value,
    };
    this.attendanceStudentService
      .updateAttendance(this.att.attendanceId, payload)
      .subscribe(() => {
        this.getAttendance();
        this.attDialog = false;
      });
  };
}
