import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  students: any = [];

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentId();
  }
  getStudentId = () => {
    const parentId = this.authService.getUserId();
    this.studentService
      .getStudentByParentId(parentId)
      .subscribe((data: any) => {
        this.students = data;
      });
  };

  view = (studentId: number) => {
    this.router.navigate([`/parent/attendance/${studentId}`]);
  };
}
