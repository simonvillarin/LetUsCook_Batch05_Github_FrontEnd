import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  student: any = {};
  subjects: any = [];
  attendance: any = [];
  atts = ['Present', 'Absent', 'Late'];

  subject = '';
  att1 = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private studentAttendanceService: AttendanceStudentService
  ) {}

  ngOnInit(): void {
    this.getStudentId();
  }

  getStudentId = () => {
    const parentId = this.authService.getUserId();
    this.studentService
      .getStudentByParentId(parentId)
      .subscribe((data: any) => {
        this.student = data;
        this.getStudentAttendance();
      });
  };

  getStudentAttendance = () => {
    this.studentAttendanceService
      .getAttendanceByStudentId(this.student.studentId)
      .subscribe((data) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.subjects = [];
        const uniqueSubs = this.getUniqueObjects(data);
        uniqueSubs.map((sub: any) => {
          if (sub.status) {
            this.subjects.push(sub.subject.subjectTitle);
          }
        });
        this.subject = this.subjects[0];
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

  onChangeAttendance = (status: string) => {
    this.studentAttendanceService
      .getAttendanceByStudentId(this.student.studentId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        if (this.subject != '') {
          this.attendance = this.attendance.filter(
            (att: any) =>
              att.status == status && att.subject.subjectTitle == this.subject
          );
        } else {
          this.attendance = this.attendance.filter(
            (att: any) => att.status == status
          );
        }
      });
  };

  onChangeSubject = (sub: string) => {
    this.studentAttendanceService
      .getAttendanceByStudentId(this.student.studentId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        if (this.att1 != '') {
          this.attendance = this.attendance.filter(
            (att: any) =>
              att.status == this.att1 && att.subject.subjectTitle == sub
          );
        } else {
          this.attendance = this.attendance.filter(
            (att: any) => att.subject.subjectTitle == sub
          );
        }
      });
  };

  onReset = () => {
    this.att1 = '';
    this.getStudentAttendance();
  };
}
