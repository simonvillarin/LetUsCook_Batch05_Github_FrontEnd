import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  sectionId: any;
  subjectId: any;

  constructor(
    private gradeService: GradeService,
    private attendanceStudentService: AttendanceStudentService,
    private route: ActivatedRoute
  ) {}

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
      .subscribe((data: any) => console.log(data));
  };

  getAttendance = () => {
    this.attendanceStudentService
      .getAttendanceBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => console.log(data));
  };
}
