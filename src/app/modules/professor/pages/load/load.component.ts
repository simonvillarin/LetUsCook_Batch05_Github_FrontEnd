import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined;

  sectionId: any;
  subjectId: any;
  grades: any = [];
  attendance: any = [];
  gradesToSubmit: any = [];
  attendanceToSubmit: any = [];

  isEditing: boolean = false;

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
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        this.grades.map((d: any) => {
          let obj = {
            gradeId: '',
            prelim: d.prelim,
            midterm: d.midterm,
            finals: d.finals,
          };
          this.gradesToSubmit.push(obj);
        });
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

  onReset = () => {
    this.isEditing = false;
  };

  onEdit = () => {
    this.isEditing = !this.isEditing;
  };

  onChangePrelim = (event: any, index: number, id: number) => {
    const value = (event.target as HTMLInputElement).value;
    this.gradesToSubmit[index].gradeId = id;
    this.gradesToSubmit[index].prelim = value;
  };

  onChangeMidterm = (event: any, index: number, id: number) => {
    const value = (event.target as HTMLInputElement).value;
    this.gradesToSubmit[index].gradeId = id;
    this.gradesToSubmit[index].midterm = value;
  };

  onChangeFinal = (event: any, index: number, id: number) => {
    const value = (event.target as HTMLInputElement).value;
    this.gradesToSubmit[index].gradeId = id;
    this.gradesToSubmit[index].finals = value;
  };

  onSubmit = () => {
    if (this.gradesToSubmit.length > 0) {
      this.gradesToSubmit.map((grade: any) => {
        let payload = {
          prelim: grade.prelim,
          midterm: grade.midterm,
          finals: grade.finals,
        };
        this.gradeService
          .updateGrade(grade.gradeId, payload)
          .subscribe((res) => console.log(res));
      });
      this.getGrades();
      this.isEditing = false;
    }
  };
}
