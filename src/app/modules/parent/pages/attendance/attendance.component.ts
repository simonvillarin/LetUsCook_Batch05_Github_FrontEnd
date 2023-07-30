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
  attendance = [
    {
      subject: '',
      status: '',
      uploadDate: '',
    },
  ];

  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  period = [{ name: 'Prelims' }, { name: 'Midterms' }, { name: 'Finals' }];

  termsSelected: string = 'First Term';
  periodSelected: string = 'Prelims';

  termSelected: FormGroup;

  student: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private studentAttendanceService: AttendanceStudentService
  ) {
    this.termSelected = fb.group({
      term: [''],
      period: [''],
    });
  }

  ngOnInit(): void {
    this.getStudentId();
  }

  getStudentId = () => {
    const parentId = this.authService.getUserId();
    this.studentService
      .getStudentByParentId(parentId)
      .subscribe((data: any) => {
        this.student = data;
        //this.getStudentAttendance();
      });
  };
}
